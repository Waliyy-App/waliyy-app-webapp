import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorBoundary } from "react-error-boundary";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import LikePage from "./pages/LikePage";
import MatchPage from "./pages/MatchPage";
import SettingsPage from "./pages/SettingsPage";
import PricingPage from "./pages/PricingPage";
import { Filters } from "./pages/Filters";
import ProfileDetails from "./components/profile/ProfileDetails";
import SuitorProfile from "./components/profile/SuitorProfile";
import GeneralProfile from "./components/profile/GeneralProfile";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ForgotPassword from "./pages/ForgotPassword";
import ProfileSetupForm from "./pages/ProfileSetupForm";
import LandingPage from "./pages/LandingPage";
import AboutLandingPage from "./pages/AboutLandingPage";
import ProtectedRoute from "./route/ProtectedRoute";
import UnProtectedRoute from "./route/UnProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";
import SplashScreen from "./screens/SplashScreen";
import VerifyEmailScreen from "./screens/VerifyEmailScreen";
import { useResetScrollPosition } from "./utils.js";
import NetworkError from "./screens/NetworkError";
import NoPage from "./screens/404Page";
import UserList from "./screens/UserList";
import { useAuthContext } from "./context/AuthContext.js";
import { getCurrentPlan, getSubscribedUser } from "./services/index.js";
import PaymentConfirmation from "./pages/PaymentConfirmation.js";
import ResourcePage from "./pages/ResourcePage.js";
import Blogpage from "./pages/Blogpage.js";
import BlogPostPage from "./pages/BlogPostPage";
import Terms from "./pages/Terms.js";
import SubscriptionStatus from "./pages/SubscriptionStatus.js";
import RefundPolicy from "./pages/RefundPolicy.js";

export const AppLayout = ({ children }) => {
  useResetScrollPosition();
  return <div>{children}</div>;
};

function App() {
  const theme = createTheme({
    typography: { fontFamily: "Nunito, san-serif" },
    palette: { secondary: { main: "#BA9FFE" } },
  });

  const navigate = useNavigate();
  const { token, user } = useAuthContext();
  const [activePlan, setActivePlan] = useState(null);
 
  // isActive will be set back to true after testing.
  useEffect(() => {
    const checkActivePlan = async () => {
      try {
        let isActive = false;

        // 1️⃣ Check current plan endpoint previous check
        const res1 = await getCurrentPlan(token);
        //console.log(res1)
        setActivePlan(res1?.data);
        

        // 2️⃣ Check premium content endpoint flutterwave
        const res2 = await getSubscribedUser(token);
        //console.log(res2)
        if (res2?.status === "active") isActive = true;
        setActivePlan(isActive);

      } catch (err) {
        console.error("Error checking active plan:", err);
        setActivePlan(false);
      }
    };
      checkActivePlan();

    if (token) {
      checkActivePlan();
    }
  }, [token, user]);

  return (
    <ErrorBoundary FallbackComponent={NetworkError} onReset={() => navigate("/dashboard")}>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <AppLayout>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/about" element={<AboutLandingPage />} />
            <Route exact path="/resources" element={<ResourcePage />} />
            <Route exact path="/blog" element={<Blogpage />} />
            <Route exact path="/terms" element={<Terms />} />
            <Route exact path="/refund" element={<RefundPolicy />} />
            <Route exact path="/get-started" element={<ProfileSetupForm />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route exact path="*" element={<NoPage />} />

            <Route element={<UnProtectedRoute />}>
              <Route exact path="/sign-up" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/forgot-password" element={<ForgotPassword />} />
              <Route exact path="/reset-password" element={<ResetPassword />} />
              <Route exact path="/verify-email" element={<VerifyEmailScreen />} />
              <Route exact path="/verify-otp" element={<VerifyOtp />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/subscription-status" element={<SubscriptionStatus />} />
              <Route exact path="/explore" element={<Explore />} />
              <Route
                exact
                path="/likes"
                element={activePlan ? <LikePage /> : <PricingPage />}
              />
              <Route
                exact
                path="/match"
                element={activePlan ? <MatchPage /> : <PricingPage />}
              />
              <Route exact path="/settings" element={<SettingsPage />} />
              <Route exact path="/pricing" element={<PricingPage />} />
              <Route exact path="/confirm-payment" element={<PaymentConfirmation />} />
              <Route exact path="/get-started" element={<ProfileSetupForm />} />
              <Route exact path="/select-child" element={<UserList />} />
              <Route exact path="/filter" element={<Filters />} />
              <Route exact path="/profile/:id" element={<ProfileDetails />} />
              <Route exact path="/recommended/:id" element={<SuitorProfile />} />
              <Route exact path="/explore/:id" element={<GeneralProfile />} />
              <Route exact path="/login-successful" element={<SplashScreen />} />
            </Route>
          </Routes>
        </AppLayout>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
