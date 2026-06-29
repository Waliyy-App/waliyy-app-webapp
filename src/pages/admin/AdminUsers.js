import React, { useEffect, useState, useCallback } from "react";
import AdminLayout from "./AdminLayout";
import { useAuthContext } from "../../context/AuthContext";
import { getAdminUsers, toggleBlockUser, adminDeleteUser } from "../../services/adminService";
import SearchIcon from "@mui/icons-material/Search";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import { toast } from "react-toastify";

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ blocked, isEmailVerified }) => {
  if (blocked)
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600">
        <BlockIcon sx={{ fontSize: 12 }} /> Blocked
      </span>
    );
  if (!isEmailVerified)
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-600">
        Unverified
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-600">
      <CheckCircleIcon sx={{ fontSize: 12 }} /> Active
    </span>
  );
};

// ─── Confirm Modal ────────────────────────────────────────────────────────────
const ConfirmModal = ({ isOpen, title, message, confirmLabel, confirmClass, onConfirm, onCancel, loading }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 border border-purple-100">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-lg text-[#2D133A]">{title}</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <CloseIcon fontSize="small" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded-xl text-white font-semibold text-sm transition ${confirmClass} disabled:opacity-60`}
          >
            {loading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Admin Users Page ─────────────────────────────────────────────────────────
const AdminUsers = () => {
  const { token } = useAuthContext();

  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const LIMIT = 20;

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modal state
  const [modal, setModal] = useState({ open: false, type: null, user: null });

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAdminUsers(token, { page, limit: LIMIT, search });
      const d = res?.data ?? res;
      setUsers(d.users ?? []);
      setTotal(d.total ?? 0);
      setTotalPages(d.totalPages ?? 1);
    } catch (err) {
      setError("Failed to load users. Check that the admin API is deployed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token, page, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  const openModal = (type, user) => setModal({ open: true, type, user });
  const closeModal = () => setModal({ open: false, type: null, user: null });

  const handleConfirmAction = async () => {
    if (!modal.user) return;
    setActionLoading(true);
    try {
      if (modal.type === "block") {
        await toggleBlockUser(token, modal.user._id, true);
        toast.success(`${modal.user.firstName} has been blocked.`);
      } else if (modal.type === "unblock") {
        await toggleBlockUser(token, modal.user._id, false);
        toast.success(`${modal.user.firstName} has been unblocked.`);
      } else if (modal.type === "delete") {
        await adminDeleteUser(token, modal.user._id);
        toast.success(`${modal.user.firstName}'s account has been deleted.`);
      }
      closeModal();
      fetchUsers();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Action failed.");
    } finally {
      setActionLoading(false);
    }
  };

  // ─── Derived values ────────────────────────────────────────────────────────
  const modalConfig = {
    block: {
      title: "Block User",
      message: `Are you sure you want to block ${modal.user?.firstName} ${modal.user?.lastName}? They will not be able to log in.`,
      confirmLabel: "Block",
      confirmClass: "bg-red-500 hover:bg-red-600",
    },
    unblock: {
      title: "Unblock User",
      message: `Are you sure you want to unblock ${modal.user?.firstName} ${modal.user?.lastName}?`,
      confirmLabel: "Unblock",
      confirmClass: "bg-emerald-500 hover:bg-emerald-600",
    },
    delete: {
      title: "Delete Account",
      message: `This action is permanent. Are you sure you want to permanently delete ${modal.user?.firstName} ${modal.user?.lastName}'s account?`,
      confirmLabel: "Delete",
      confirmClass: "bg-red-600 hover:bg-red-700",
    },
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2D133A]">User Management</h1>
          <p className="text-gray-500 mt-1">
            {total > 0 ? `${total.toLocaleString()} total users` : "Manage all registered parents"}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-6 flex gap-3">
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fontSize="small" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name, email or phone..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
          />
          {searchInput && (
            <button type="button" onClick={handleClearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <CloseIcon fontSize="small" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-violet-500 text-white font-semibold rounded-xl text-sm shadow hover:opacity-90 transition"
        >
          Search
        </button>
      </form>

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
                <th className="text-left px-5 py-4 w-12">#</th>
                <th className="text-left px-5 py-4">User</th>
                <th className="text-left px-5 py-4">Email</th>
                <th className="text-left px-5 py-4 hidden md:table-cell">Phone</th>
                <th className="text-left px-5 py-4 hidden lg:table-cell">Gender</th>
                <th className="text-left px-5 py-4">Status</th>
                <th className="text-left px-5 py-4 hidden sm:table-cell">Joined</th>
                <th className="text-left px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 bg-gray-100 rounded-lg w-3/4" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-gray-400">
                    <PersonIcon sx={{ fontSize: 48 }} className="mb-2 block mx-auto text-gray-200" />
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id} className="hover:bg-purple-50/40 transition-colors">
                    <td className="px-5 py-4 text-gray-500 font-medium">
                      {(page - 1) * LIMIT + index + 1}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {user.firstName?.[0]?.toUpperCase()}{user.lastName?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-[#2D133A]">
                            {user.firstName} {user.lastName}
                          </p>
                          {user.role === "ADMIN" && (
                            <span className="text-xs text-purple-500 font-bold">Admin</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600 max-w-[160px] truncate">{user.email}</td>
                    <td className="px-5 py-4 text-gray-600 hidden md:table-cell">{user.phone}</td>
                    <td className="px-5 py-4 text-gray-600 capitalize hidden lg:table-cell">
                      {user.gender?.toLowerCase()}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge blocked={user.blocked} isEmailVerified={user.isEmailVerified} />
                    </td>
                    <td className="px-5 py-4 text-gray-500 hidden sm:table-cell">
                      {new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit", month: "short", year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {user.blocked ? (
                          <button
                            onClick={() => openModal("unblock", user)}
                            title="Unblock"
                            className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
                          >
                            <CheckCircleIcon fontSize="small" />
                          </button>
                        ) : (
                          <button
                            onClick={() => openModal("block", user)}
                            title="Block"
                            className="p-2 rounded-lg bg-amber-50 text-amber-500 hover:bg-amber-100 transition"
                          >
                            <BlockIcon fontSize="small" />
                          </button>
                        )}
                        <button
                          onClick={() => openModal("delete", user)}
                          title="Delete"
                          className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
                        >
                          <DeleteIcon fontSize="small" />
                        </button>
                      </div>
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
              Page {page} of {totalPages}
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

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={modal.open}
        title={modalConfig[modal.type]?.title}
        message={modalConfig[modal.type]?.message}
        confirmLabel={modalConfig[modal.type]?.confirmLabel}
        confirmClass={modalConfig[modal.type]?.confirmClass}
        onConfirm={handleConfirmAction}
        onCancel={closeModal}
        loading={actionLoading}
      />
    </AdminLayout>
  );
};

export default AdminUsers;
