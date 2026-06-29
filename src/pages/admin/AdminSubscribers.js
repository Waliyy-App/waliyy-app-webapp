import React, { useEffect, useState, useCallback } from "react";
import AdminLayout from "./AdminLayout";
import { useAuthContext } from "../../context/AuthContext";
import { getAdminSubscriptions, addManualSubscription } from "../../services/adminService";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EventIcon from "@mui/icons-material/Event";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { toast } from "react-toastify";

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, Icon, gradient, loading }) => (
  <div className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-lg ${gradient} flex flex-col justify-between min-h-[140px] transition-transform hover:-translate-y-1 duration-200`}>
    <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white opacity-10" />
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-1">{label}</p>
        {loading ? (
          <div className="h-8 w-24 bg-white bg-opacity-30 rounded-lg animate-pulse mt-2" />
        ) : (
          <p className="text-4xl font-extrabold mt-1">{value ?? "—"}</p>
        )}
      </div>
      <div className="bg-white bg-opacity-20 rounded-xl p-3">
        <Icon className="text-white" />
      </div>
    </div>
  </div>
);

// ─── Admin Subscribers Page ───────────────────────────────────────────────────
const AdminSubscribers = () => {
  const { token } = useAuthContext();
  const [data, setData] = useState({ total: 0, monthlyUsers: [], annualUsers: [] });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ email: "", interval: "monthly" });

  const fetchSubscriptions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAdminSubscriptions(token);
      setData(res?.data ?? { total: 0, monthlyUsers: [], annualUsers: [] });
    } catch (err) {
      setError("Failed to load subscriptions. Check that the admin API is deployed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) return;
    
    setActionLoading(true);
    try {
      await addManualSubscription(token, formData.email, formData.interval);
      toast.success(`Successfully subscribed ${formData.email} to ${formData.interval} plan`);
      setModalOpen(false);
      setFormData({ email: "", interval: "monthly" });
      fetchSubscriptions();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add subscription.");
    } finally {
      setActionLoading(false);
    }
  };

  const renderTable = (users, title) => (
    <div className="bg-white rounded-2xl border border-purple-50 shadow-sm overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <h2 className="text-lg font-bold text-[#2D133A]">{title}</h2>
        <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">{users.length} Active</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#F7F3FF] text-[#2D133A] font-bold">
            <tr>
              <th className="text-left px-5 py-4 w-12">#</th>
              <th className="text-left px-5 py-4">Name</th>
              <th className="text-left px-5 py-4">Email</th>
              <th className="text-left px-5 py-4">Plan</th>
              <th className="text-left px-5 py-4">Amount</th>
              <th className="text-left px-5 py-4">Status</th>
              <th className="text-left px-5 py-4">Expires At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">No subscribers found in this category.</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.subId} className="hover:bg-purple-50/40 transition-colors">
                  <td className="px-5 py-4 text-gray-500 font-medium">{index + 1}</td>
                  <td className="px-5 py-4 font-semibold text-[#2D133A]">{user.name}</td>
                  <td className="px-5 py-4 text-gray-600">{user.email}</td>
                  <td className="px-5 py-4 text-gray-600">{user.planName}</td>
                  <td className="px-5 py-4 font-medium text-gray-900">{user.amount}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                      user.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{user.expiresAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2D133A]">Subscribers</h1>
          <p className="text-gray-500 mt-1">Manage and view all active subscriptions</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-violet-500 text-white font-semibold rounded-xl shadow hover:opacity-90 transition flex items-center gap-2"
        >
          <AddCircleIcon fontSize="small" />
          Add Manual Sub
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Total Subs"
          value={data.total}
          Icon={VerifiedUserIcon}
          gradient="bg-gradient-to-br from-violet-500 to-purple-700"
          loading={loading}
        />
        <StatCard
          label="Monthly"
          value={data.monthlyUsers.length}
          Icon={EventIcon}
          gradient="bg-gradient-to-br from-blue-400 to-indigo-600"
          loading={loading}
        />
        <StatCard
          label="Annual"
          value={data.annualUsers.length}
          Icon={DateRangeIcon}
          gradient="bg-gradient-to-br from-emerald-400 to-teal-600"
          loading={loading}
        />
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 animate-pulse">Loading subscriptions...</div>
      ) : (
        <>
          {renderTable(data.monthlyUsers, "Monthly Subscribers")}
          {renderTable(data.annualUsers, "Annual Subscribers")}
        </>
      )}

      {/* Add Subscription Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 border border-purple-100">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-bold text-xl text-[#2D133A]">Add Manual Subscription</h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <CloseIcon fontSize="small" />
              </button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">User Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter user's email address"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Interval (NGN)</label>
                <select
                  required
                  value={formData.interval}
                  onChange={(e) => setFormData({ ...formData, interval: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white"
                >
                  <option value="monthly">Monthly Plan</option>
                  <option value="annual">Annual Plan</option>
                </select>
              </div>
              
              <div className="flex gap-3 justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  disabled={actionLoading}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading || !formData.email}
                  className="px-5 py-2.5 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-violet-500 hover:opacity-90 transition disabled:opacity-60"
                >
                  {actionLoading ? "Processing..." : "Add Subscription"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminSubscribers;
