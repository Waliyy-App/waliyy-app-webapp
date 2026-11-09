# Backend auth fixes required

These changes belong to the API service (`https://api.waliyyapp.com/api/v1`), which is not
part of this repository. Paths below are suggestions; adapt them to the actual layout.

Status legend: **[BLOCKER]** breaks a user flow, **[UX]** improves deliverability/experience,
**[SECURITY]** must be addressed immediately.

---

## 0. [BLOCKER] Use a 30-minute TTL for every OTP in the app

Production currently expires codes after ~10 minutes (the reset email says "valid for 10 minutes"),
and the verify-email page surfaces `Invalid or Expired Otp` when a user is slower than that. The
frontend cannot extend this — the server rejects the code regardless of any on-page timer.

Make 30 minutes the single source of truth for **all** OTPs: signup verification, resend
verification, password reset, admin 2FA, and any other one-time code.

```js
// src/config/constants.js
const OTP_TTL_MINUTES = 30;
const OTP_TTL_MS = OTP_TTL_MINUTES * 60 * 1000;
```

```js
// Use the same TTL everywhere an OTP is issued
user.emailVerificationOtpExpires = new Date(Date.now() + OTP_TTL_MS);
user.passwordResetOtpExpires = new Date(Date.now() + OTP_TTL_MS);
// admin 2FA and any other OTP the same way
```

Checklist for this change:

- Replace every hard-coded `10 * 60 * 1000` / `600` seconds with `OTP_TTL_MS`.
- If OTPs live in Redis, set the key TTL to `OTP_TTL_MINUTES * 60` seconds.
- Update every email template/body from "valid for 10 minutes" to "valid for 30 minutes".
- Check the OTP schema for an `expires`/TTL index that could delete the record earlier than 30 minutes.
- Verify the same limit applies to the **signup** email, not just password reset.

The frontend now shows "The code is valid for 30 minutes." and the reset countdown starts at
`30:00`. Keep those in sync if the backend value ever changes.

---

## 1. [BLOCKER] `POST /auth/resend-verification` crashes for every real user

Reproduced against production:

```
POST /auth/resend-verification {"email":"<existing user>"}
500 {"status":"Error","message":"user.isEmailVerified is not a function"}
```

`isEmailVerified` is a boolean field on the user document, not a method.

```js
// src/controllers/auth.controller.js
exports.resendVerification = async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const user = await User.findOne({ email });

    // Keep the response identical for unknown emails to avoid account enumeration.
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "Verification email resent successfully",
        data: null,
      });
    }

    // FIX: boolean check, not a function call
    if (user.isEmailVerified === true) {
      return res.status(400).json({
        status: "Error",
        message: "Email is already verified. Please log in.",
      });
    }

    const otp = generateOtp(); // 6 digits
    user.emailVerificationOtp = otp;
    user.emailVerificationOtpExpires = new Date(Date.now() + OTP_TTL_MS);
    await user.save();

    await sendVerificationEmail(user, otp); // see section 2

    return res.status(200).json({
      success: true,
      message: "Verification email resent successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
```

Also make sure the route is mounted at `POST /auth/resend-verification` (the frontend uses it).

---

## 2. [UX] Send a dedicated verification email

Today the OTP is embedded mid-way through the marketing email with subject
`Welcome to WaliyyApp!`. Many users never scroll far enough, so they report "no code received".

Add a focused template and call it from **both** signup and resend. Keep the welcome email
separate if desired.

```js
// src/services/email.service.js
const sendVerificationEmail = async (user, otp) => {
  const subject = "Your WaliyyApp verification code";
  const htmlContent = `
    <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#2D133A">
      <h2 style="margin-bottom:8px">Verify your email</h2>
      <p>Assalaam Alaykum ${user.firstName},</p>
      <p>Use this code to verify your WaliyyApp account:</p>
      <p style="font-size:32px;font-weight:700;letter-spacing:8px;margin:24px 0">${otp}</p>
      <p>This code is valid for 30 minutes. If you didn't create an account, you can ignore this email.</p>
      <p style="color:#665e6b;font-size:12px">WaliyyApp · waliyyapp@waliyyapp.com</p>
    </div>`;

  const textContent = [
    `Assalaam Alaykum ${user.firstName},`,
    "",
    "Use this code to verify your WaliyyApp account:",
    otp,
    "",
    "This code is valid for 30 minutes.",
  ].join("\n");

  return sendTransactionalEmail({
    to: [{ email: user.email, name: user.fullName || user.firstName }],
    subject,
    htmlContent,
    textContent,
  });
};
```

Notes:
- `htmlContent` is **required** by Brevo. Omitting it produces
  `400 missing_parameter: htmlContent is missing` (this is also the cause of the delete bug in section 6).
- Send the welcome/marketing email separately, and remove the OTP from it so there is a single,
  unambiguous place to look.
- Include a plain-text part; it improves deliverability and is required by some filters.

---

## 3. [UX] Rename the password-reset subject

The reset email currently arrives with subject `Password Changed`, which implies the password
was already changed and alarms users.

```js
// src/services/email.service.js
const subject = "Reset Your Password";
```

Keep the body copy and the 30-minute validity. Suggested preheader/opening line:
"We received a request to reset your WaliyyApp password. Use the code below to continue."

---

## 4. [UX] Make rate limiting per-route with accurate messages

Production currently applies `RateLimit-Policy: 10; w=300` to **all** auth routes and returns
`You tried to login too many times, please try again after 5 minutes.` for every 429, including
`/auth/resend-verification` and `/auth/forgot-password`. A handful of legitimate retries locks a
user out of every auth action.

```js
// src/middleware/rateLimit.js
const rateLimit = require("express-rate-limit");

const makeLimiter = (max, message) =>
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max,
    standardHeaders: true, // RateLimit-* headers
    legacyHeaders: false,
    keyGenerator: (req) =>
      `${req.ip}:${String(req.body?.email || "").trim().toLowerCase()}`,
    handler: (_req, res) =>
      res.status(429).json({ status: "Error", message }),
  });

module.exports = {
  loginLimiter: makeLimiter(
    20,
    "Too many login attempts. Please wait 5 minutes and try again."
  ),
  signupLimiter: makeLimiter(
    10,
    "Too many signup attempts. Please wait 5 minutes and try again."
  ),
  resendLimiter: makeLimiter(
    3,
    "Too many verification emails requested. Please wait 5 minutes before requesting another."
  ),
  forgotLimiter: makeLimiter(
    5,
    "Too many password reset requests. Please wait 5 minutes and try again."
  ),
  verifyLimiter: makeLimiter(
    10,
    "Too many verification attempts. Please wait 5 minutes and try again."
  ),
};
```

```js
// src/routes/auth.routes.js
router.post("/signup", signupLimiter, signup);
router.post("/login", loginLimiter, login);
router.put("/verify-email", verifyLimiter, verifyEmail);
router.post("/resend-verification", resendLimiter, resendVerification);
router.put("/forgot-password", forgotLimiter, forgotPassword);
router.put("/reset-password", verifyLimiter, resetPassword);
```

Remove the blanket auth limiter (or keep a much higher global cap, e.g. `100 / 5 min`) so one
route cannot exhaust another's budget. If you key by IP only, note that offices and mobile
carriers share IPs — keying by `ip + email` is fairer.

---

## 5. [UX] Make `/auth/signup` resend for an existing unverified account

Today re-submitting signup for an existing email returns
`400 User with this email or phone number already exists` and sends nothing. Users who lost the
first email are stuck.

```js
// src/controllers/auth.controller.js (inside signup)
const existing = await User.findOne({
  $or: [{ email }, { phone: phoneNumber }],
});

if (existing) {
  if (!existing.isEmailVerified) {
    const otp = generateOtp();
    existing.emailVerificationOtp = otp;
    existing.emailVerificationOtpExpires = new Date(Date.now() + OTP_TTL_MS);
    await existing.save();
    await sendVerificationEmail(existing, otp);

    return res.status(200).json({
      success: true,
      message:
        "An account with this email already exists but isn't verified. We've sent a new verification code.",
      data: null,
    });
  }

  return res.status(400).json({
    status: "Error",
    message: "User with this email or phone number already exists",
  });
}
```

This is safe from account takeover because no session is issued and the code still goes to the
registered mailbox. Consider adding a small cooldown (e.g. 60s) to avoid mail bombing.

The frontend already redirects an "already exists" signup error to the OTP screen with the email
prefilled, so this backend change makes that path fully recoverable.

---

## 6. [BLOCKER] `PUT /account/delete` fails while deleting

Production returns:

```
500 {"status":"Error","message":"Error sending email: {... \"message\":\"htmlContent is missing\" ...}"}
```

The account **is** deleted, but the client is told it failed. Fix both sides:

```js
// src/controllers/account.controller.js
exports.deleteAccount = async (req, res, next) => {
  try {
    const user = req.user;

    await User.deleteOne({ _id: user._id });

    // Best-effort notification: never let email failure change the response.
    try {
      await sendTransactionalEmail({
        to: [{ email: user.email, name: user.firstName }],
        subject: "Your WaliyyApp account has been deleted",
        htmlContent: "<p>Your account has been deleted. We're sorry to see you go.</p>",
        textContent: "Your account has been deleted. We're sorry to see you go.",
      });
    } catch (mailErr) {
      logger.error("delete-account email failed", { userId: user._id, err: mailErr.message });
    }

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
```

Key points: include `htmlContent`, and decouple email delivery from the delete result.

---

## 7. [SECURITY] Stop leaking the Brevo API key in error responses

The `account/delete` 500 response included the full upstream request object, including the live
`api-key` header (`xkeysib-...`) and request metadata. Anyone who can trigger a 500 can read it.

Actions:

1. **Rotate the Brevo API key immediately** (Brevo → SMTP & API → API Keys → delete + regenerate).
2. Never serialize upstream errors to clients. Use a single error handler:

```js
// src/middleware/errorHandler.js
module.exports = (err, req, res, _next) => {
  logger.error("Unhandled API error", {
    path: req.originalUrl,
    method: req.method,
    message: err.message,
    stack: err.stack,
    upstream: err.response?.data,
  });

  if (err.response?.status === 429) {
    return res.status(429).json({
      status: "Error",
      message: "Too many requests. Please try again later.",
    });
  }

  return res.status(500).json({
    status: "Error",
    message: "Something went wrong. Please try again.",
  });
};
```

3. Ensure `logger` output is server-side only and redacts `api-key`/`Authorization` headers.

---

## Verification checklist

After applying the above, these should pass against production:

| Check | Expected |
| --- | --- |
| Use a signup OTP 11+ minutes after it was sent | still verifies (code valid until 30 min) |
| Use a reset OTP 29 minutes after it was sent | still resets the password |
| Use any OTP 31 minutes after it was sent | `400 Invalid or Expired Otp` |
| Reset/verification email body | "This code is valid for 30 minutes." |
| `POST /auth/resend-verification` with an existing unverified email | `200`, new email with subject `Your WaliyyApp verification code` |
| Same for a verified email | `400 Email is already verified. Please log in.` |
| Signup email subject | `Your WaliyyApp verification code` |
| Forgot-password email subject | `Reset Your Password` |
| Resend OTP 4 times in 5 minutes | `429` with a resend-specific message |
| `POST /auth/signup` for existing unverified email | `200`, new code sent |
| `PUT /account/delete` | `200`, account removed, no `htmlContent` error |
| Any forced 500 | Generic message only, no API keys or upstream headers |
