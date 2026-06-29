import React, { useEffect, useState, useCallback } from "react";
import AdminLayout from "./AdminLayout";
import { useAuthContext } from "../../context/AuthContext";
import { getAdminMatches } from "../../services/adminService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import FilterListIcon from "@mui/icons-material/FilterList";

// ─── Match Status Badge ───────────────────────────────────────────────────────
const MatchBadge = ({ status }) => {
  const config = {
    PENDING: { label: "Pending", icon: <HourglassTopIcon sx={{ fontSize: 12 }} />, cls: "bg-amber-100 text-amber-700" },
    ACCEPTED: { label: "Accepted", icon: <CheckCircleIcon sx={{ fontSize: 12 }} />, cls: "bg-emerald-100 text-emerald-700" },
    DECLINED: { label: "Declined", icon: <CancelIcon sx={{ fontSize: 12 }} />, cls: "bg-red-100 text-red-600" },
    CANCELLED: { label: "Cancelled", icon: <CancelIcon sx={{ fontSize: 12 }} />, cls: "bg-gray-100 text-gray-500" },
    PENDING_CANCELLATION: { label: "Pending Cancel", icon: <HourglassTopIcon sx={{ fontSize: 12 }} />, cls: "bg-orange-100 text-orange-600" },
  };
  const c = config[status] ?? { label: status, icon: null, cls: "bg-gray-100 text-gray-500" };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${c.cls}`}>
      {c.icon} {c.label}
    </span>
  );
};

// ─── Admin Matches Page ───────────────────────────────────────────────────────
const AdminMatches = () => {
  const { token } = useAuthContext();

  const [matches, setMatches] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const LIMIT = 20;

  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const STATUS_OPTIONS = [
    { value: "", label: "All Statuses" },
    { value: "PENDING", label: "Pending" },
    { value: "ACCEPTED", label: "Accepted" },
    { value: "DECLINED", label: "Declined" },
    { value: "CANCELLED", label: "Cancelled" },
  ];

  const fetchMatches = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAdminMatches(token, { page, limit: LIMIT, status: statusFilter });
      const d = res?.data ?? res;
      setMatches(d.matches ?? []);
      setTotal(d.total ?? 0);
      setTotalPages(d.totalPages ?? 1);
    } catch (err) {
      setError("Failed to load matches. Check that the admin API is deployed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token, page, statusFilter]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  const formatName = (child) =>
    child ? `${child.firstName ?? ""} ${child.lastName ?? ""}`.trim() || child.displayId || "—" : "—";

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
      : "—";

  const isExpired = (match) =>
    match.status === "PENDING" && new Date(match.expiresAt) < new Date();

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2D133A]">Match Management</h1>
          <p className="text-gray-500 mt-1">
            {total > 0 ? `${total.toLocaleString()} total matches` : "View and monitor all matches"}
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <FilterListIcon className="text-gray-400" fontSize="small" />
          <select
            value={statusFilter}
            onChange={handleFilterChange}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-purple-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F7F3FF] text-[#2D133A] font-bold">
              <tr>
                <th className="text-left px-5 py-4">#</th>
                <th className="text-left px-5 py-4">Initiator</th>
                <th className="text-left px-5 py-4">Receiver</th>
                <th className="text-left px-5 py-4">Status</th>
                <th className="text-left px-5 py-4 hidden md:table-cell">Created</th>
                <th className="text-left px-5 py-4 hidden lg:table-cell">Expires</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 bg-gray-100 rounded-lg w-3/4" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : matches.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-gray-400">
                    <FavoriteIcon sx={{ fontSize: 48 }} className="mb-2 block mx-auto text-gray-200" />
                    No matches found
                  </td>
                </tr>
              ) : (
                matches.map((match, index) => (
                  <tr
                    key={match._id}
                    className={`hover:bg-purple-50/40 transition-colors ${
                      isExpired(match) ? "opacity-60" : ""
                    }`}
                  >
                    <td className="px-5 py-4 text-gray-400 font-mono text-xs">
                      {(page - 1) * LIMIT + index + 1}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                          {(match.initiator?.firstName?.[0] ?? "?").toUpperCase()}
                        </div>
                        <span className="font-semibold text-[#2D133A]">{formatName(match.initiator)}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                          {(match.receiver?.firstName?.[0] ?? "?").toUpperCase()}
                        </div>
                        <span className="font-semibold text-[#2D133A]">{formatName(match.receiver)}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1">
                        <MatchBadge status={match.status} />
                        {isExpired(match) && (
                          <span className="text-xs text-gray-400">Expired</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-500 hidden md:table-cell">
                      {formatDate(match.createdAt)}
                    </td>
                    <td className="px-5 py-4 text-gray-500 hidden lg:table-cell">
                      {formatDate(match.expiresAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-50">
            <p className="text-sm text-gray-500">
              Page {page} of {totalPages} &nbsp;·&nbsp; {total.toLocaleString()} total
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold disabled:opacity-40 hover:bg-gray-50 transition"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold disabled:opacity-40 hover:bg-gray-50 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminMatches;
