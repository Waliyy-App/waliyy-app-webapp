import axios from "axios";

const API_BASE_URL = "https://api.waliyyapp.com/api/v1";
// const API_BASE_URL = "http://localhost:9292/api/v1";
const apiService = axios.create({
  baseURL: API_BASE_URL,
  responseType: "json",
});

// ─── Dashboard Metrics ────────────────────────────────────────────────────────

/**
 * Fetch aggregate dashboard metrics.
 * Endpoint: GET /admin/metrics
 */
export const getAdminMetrics = async (token) => {
  const response = await apiService.get("/admin/metrics", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ─── User Management ──────────────────────────────────────────────────────────

/**
 * Fetch paginated list of all parent users.
 * Endpoint: GET /admin/users?page=&limit=&search=
 */
export const getAdminUsers = async (token, { page = 1, limit = 20, search = "" } = {}) => {
  const response = await apiService.get(
    `/admin/users?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

/**
 * Block or unblock a user account.
 * Endpoint: PUT /admin/users/:id/block
 */
export const toggleBlockUser = async (token, userId, blocked) => {
  const response = await apiService.put(
    `/admin/users/${userId}/block`,
    { blocked },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

/**
 * Permanently delete a user account.
 * Endpoint: DELETE /admin/users/:id
 */
export const adminDeleteUser = async (token, userId) => {
  const response = await apiService.delete(`/admin/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ─── Match Management ─────────────────────────────────────────────────────────

/**
 * Fetch paginated list of all matches.
 * Endpoint: GET /admin/matches?page=&limit=&status=
 */
export const getAdminMatches = async (token, { page = 1, limit = 20, status = "" } = {}) => {
  const response = await apiService.get(
    `/admin/matches?page=${page}&limit=${limit}${status ? `&status=${status}` : ""}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// ─── Subscriptions Management ──────────────────────────────────────────────────

/**
 * Fetch subscriptions
 * Endpoint: GET /admin/subscriptions
 */
export const getAdminSubscriptions = async (token) => {
  const response = await apiService.get("/admin/subscriptions", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

/**
 * Add manual subscription
 * Endpoint: POST /admin/subscriptions/manual
 */
export const addManualSubscription = async (token, email, interval) => {
  const response = await apiService.post(
    "/admin/subscriptions/manual",
    { email, interval },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// ─── Analytics ─────────────────────────────────────────────────────────────

/**
 * Log daily visit
 * Endpoint: POST /metrics/log-visit
 */
export const logDailyVisit = async () => {
  const response = await apiService.post("/metrics/log-visit", {});
  return response.data;
};
