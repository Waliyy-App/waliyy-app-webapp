import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AdminLayout from "./AdminLayout";
import { useAuthContext } from "../../context/AuthContext";
import {
  getAdminPromoSubscribers,
  adminDeleteSubscription,
} from "../../services/adminService";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import PendingIcon from "@mui/icons-material/Pending";
import LanguageIcon from "@mui/icons-material/Language";
import { FaGift, FaTrashAlt, FaSyncAlt } from "react-icons/fa";
import AdminSearchBar from "../../components/admin/AdminSearchBar";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("") || "?";

const formatDate = (d) => {
  if (!d) return "—";
  try {
    const dt = new Date(d);
    if (Number.isNaN(dt)) return d;
    return dt.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return d;
  }
};

const paymentBadge = (status) => {
  const map = {
    SUCCESS: "bg-emerald-100 text-emerald-600",
    FAILED: "bg-red-100 text-red-600",
  };
  return map[status] || "bg-amber-100 text-amber-600";
};

const statusBadge = (status) =>
  status === "ACTIVE" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600";

const StatCard = ({ label, value, Icon, gradient, loading, children }) => (
  <div className={`relative overflow-hidden rounded-2xl p-5 text-white shadow-lg ${gradient} flex flex-col justify-between min-h-[130px] transition-transform hover:-translate-y-1 duration-200`}>
    <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-white opacity-10" />
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-1 truncate">{label}</p>
        {loading ? (
          <div className="h-7 w-20 bg-white bg-opacity-30 rounded-lg animate-pulse mt-1" />
        ) : (
          value !== undefined && (
            <p className="text-3xl font-extrabold mt-1 truncate">{value ?? "—"}</p>
          )
        )}
        {children}
      </div>
      <div className="bg-white bg-opacity-20 rounded-xl p-2.5 flex-shrink-0">
        <Icon className="text-white" />
      </div>
    </div>
  </div>
);

const AdminPromoSubscribers = () => {
  const { token } = useAuthContext();
  const [data, setData] = useState({ stats: {}, subscribers: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const fetchSubscribers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAdminPromoSubscribers(token);
      setData(res?.data ?? { stats: {}, subscribers: [] });
    } catch (err) {
      setError("Failed to load promo subscribers. Check that the admin API is deployed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (subId, name) => {
    if (!subId) return;
    if (!window.confirm(`Delete promo subscription for ${name || "this user"}? This cannot be undone.`)) {
      return;
    }
    try {
      setDeletingId(subId);
      await adminDeleteSubscription(token, subId);
      toast.success("Promo subscription deleted successfully.");
      fetchSubscribers();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete subscription.");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  const { stats = {}, subscribers = [] } = data;

  // Client-side filter over the fully loaded subscriber list.
  const q = searchInput.trim().toLowerCase();
  const filteredSubscribers = q
    ? subscribers.filter((s) =>
        [s.user?.name, s.user?.email, s.transactionRef, s.subId]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(q))
      )
    : subscribers;

  const revenueTotal = Object.values(stats.revenueByCurrency || {}).reduce(
    (a, b) => a + Number(b || 0),
    0
  );
  const revenueEntries = Object.entries(stats.revenueByCurrency || {});
  const currencyEntries = Object.entries(stats.byCurrency || {});

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#2D133A] to-[#4A2A63] text-[#BA9FFE] flex items-center justify-center shadow-md flex-shrink-0">
            <FaGift className="text-xl" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-0.5">
              Admin &bull; Promotions
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D133A] leading-tight">
              September Promo Subscribers
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Users subscribed via the September 3-Month offer.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={fetchSubscribers}
          disabled={loading}
          className="flex-shrink-0 self-start sm:self-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-purple-200 bg-white text-[#2D133A] font-semibold text-sm shadow-sm hover:bg-purple-50 disabled:opacity-60 transition-colors"
        >
          <FaSyncAlt className={`text-sm ${loading ? "animate-spin" : ""}`} />
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      {/* Search Bar */}
      <AdminSearchBar
        value={searchInput}
        onChange={setSearchInput}
        onClear={() => setSearchInput("")}
        placeholder="Search by name, email or transaction ref..."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6">
        <StatCard label="Total Promo Subs" value={stats.total} Icon={VerifiedUserIcon} gradient="bg-gradient-to-br from-violet-500 to-purple-700" loading={loading} />
        <StatCard label="Successful Payments" value={stats.successfulPayments} Icon={CheckCircleIcon} gradient="bg-gradient-to-br from-emerald-400 to-teal-600" loading={loading} />
        <StatCard label="Promo Revenue" value={`₦${Number(revenueTotal).toLocaleString()}`} Icon={MonetizationOnIcon} gradient="bg-gradient-to-br from-amber-400 to-orange-600" loading={loading}>
          {!loading && revenueEntries.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {revenueEntries.map(([c, v]) => (
                <span key={c} className="text-[10px] font-bold bg-white/20 rounded-full px-2 py-0.5">
                  {c} {Number(v).toLocaleString()}
                </span>
              ))}
            </div>
          )}
        </StatCard>
        <StatCard label="Failed Payments" value={stats.failedPayments} Icon={ErrorIcon} gradient="bg-gradient-to-br from-rose-500 to-red-700" loading={loading} />
        <StatCard label="Pending Payments" value={stats.pendingPayments} Icon={PendingIcon} gradient="bg-gradient-to-br from-blue-400 to-indigo-600" loading={loading} />
        <StatCard label="Subscriptions by Currency" Icon={LanguageIcon} gradient="bg-gradient-to-br from-purple-500 to-pink-600" loading={loading}>
          {!loading &&
            (currencyEntries.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {currencyEntries.map(([c, n]) => (
                  <span key={c} className="text-[11px] font-bold bg-white/20 rounded-full px-2.5 py-1">
                    {c} &middot; {n}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs opacity-80 mt-1">—</p>
            ))}
        </StatCard>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-lg font-bold text-[#2D133A]">Promotional Subscribers</h2>
          <span className="w-fit text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
            {filteredSubscribers.length}{q ? ` of ${subscribers.length}` : ""} Records
          </span>
        </div>

        {filteredSubscribers.length === 0 ? (
          <div className="px-4 py-12 text-center text-gray-400">No promotional subscribers yet.</div>
        ) : (
          <>
            {/* Mobile card list */}
            <div className="md:hidden p-3 sm:p-4 space-y-3">
              {filteredSubscribers.map((s, index) => (
                <div key={s.subId} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 rounded-full bg-[#F7F3FF] text-[#2D133A] font-bold flex items-center justify-center flex-shrink-0">
                        {getInitials(s.user?.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#2D133A] truncate">{s.user?.name || `#${index + 1}`}</p>
                        <p className="text-sm text-gray-500 truncate">{s.user?.email || "—"}</p>
                      </div>
                    </div>
                    <span className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${paymentBadge(s.paymentStatus)}`}>
                      {s.paymentStatus}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">Amount</p>
                      <p className="font-bold text-[#2D133A] truncate">
                        {s.amount} <span className="text-gray-500 font-medium">{s.currency}</span>
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">Status</p>
                      <p className={`font-bold ${s.status === "ACTIVE" ? "text-emerald-600" : "text-red-500"}`}>{s.status}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">Paid</p>
                      <p className="font-medium text-gray-700">{formatDate(s.paymentDate)}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">Expires</p>
                      <p className="font-medium text-gray-700">{formatDate(s.expiresAt)}</p>
                    </div>
                  </div>
                  {s.transactionRef && (
                    <div className="mt-2 bg-gray-50 rounded-lg p-2.5">
                      <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">Ref</p>
                      <p className="font-mono text-xs text-gray-500 truncate">{s.transactionRef}</p>
                    </div>
                  )}
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleDelete(s.subId, s.user?.name)}
                      disabled={deletingId === s.subId}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-50 transition-colors"
                      aria-label={`Delete subscription for ${s.user?.name || "user"}`}
                    >
                      <FaTrashAlt className="text-xs" />
                      {deletingId === s.subId ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F7F3FF] text-[#2D133A] font-bold">
                  <tr>
                    <th className="text-left px-5 py-4 w-12">#</th>
                    <th className="text-left px-5 py-4">Subscriber</th>
                    <th className="text-left px-5 py-4">Amount</th>
                    <th className="text-left px-5 py-4">Paid</th>
                    <th className="text-left px-5 py-4">Expires</th>
                    <th className="text-left px-5 py-4">Payment</th>
                    <th className="text-left px-5 py-4">Status</th>
                    <th className="text-right px-5 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredSubscribers.map((s, index) => (
                    <tr key={s.subId} className="hover:bg-purple-50/40 transition-colors">
                      <td className="px-5 py-4 text-gray-500 font-medium">{index + 1}</td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#2D133A]">{s.user?.name || "—"}</p>
                        <p className="text-sm text-gray-500">{s.user?.email || ""}</p>
                      </td>
                      <td className="px-5 py-4 font-medium text-gray-900">
                        {s.amount} <span className="text-gray-500">{s.currency}</span>
                      </td>
                      <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{formatDate(s.paymentDate)}</td>
                      <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{formatDate(s.expiresAt)}</td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${paymentBadge(s.paymentStatus)}`}>
                          {s.paymentStatus}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${statusBadge(s.status)}`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleDelete(s.subId, s.user?.name)}
                          disabled={deletingId === s.subId}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-50 transition-colors"
                          aria-label={`Delete subscription for ${s.user?.name || "user"}`}
                        >
                          <FaTrashAlt className="text-xs" />
                          {deletingId === s.subId ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPromoSubscribers;
