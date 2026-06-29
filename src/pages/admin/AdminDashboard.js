import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { useAuthContext } from "../../context/AuthContext";
import { getAdminMetrics } from "../../services/adminService";
import PeopleIcon from "@mui/icons-material/People";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, Icon, gradient, loading }) => (
  <div
    className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-lg ${gradient} flex flex-col justify-between min-h-[140px] transition-transform hover:-translate-y-1 duration-200`}
  >
    {/* Background decorative circle */}
    <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white opacity-10" />
    <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white opacity-5" />

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

// ─── Mini Stat Row ────────────────────────────────────────────────────────────
const MiniStat = ({ label, value, Icon, color, loading }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-purple-50 shadow-sm">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon fontSize="small" className="text-white" />
      </div>
      <span className="text-sm font-semibold text-gray-700">{label}</span>
    </div>
    {loading ? (
      <div className="h-5 w-12 bg-gray-200 rounded animate-pulse" />
    ) : (
      <span className="text-base font-bold text-gray-900">{value ?? "—"}</span>
    )}
  </div>
);

// ─── Admin Dashboard Page ────────────────────────────────────────────────────
const AdminDashboard = () => {
  const { token } = useAuthContext();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await getAdminMetrics(token);
        setMetrics(data?.data ?? data);
      } catch (err) {
        console.error("Failed to fetch admin metrics:", err);
        setError("Could not load metrics. The admin API endpoints may not be set up yet.");
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, [token]);

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#2D133A]">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Users"
          value={metrics?.totalUsers?.toLocaleString()}
          Icon={PeopleIcon}
          gradient="bg-gradient-to-br from-violet-500 to-purple-700"
          loading={loading}
        />
        <StatCard
          label="Active Matches"
          value={metrics?.activeMatches?.toLocaleString()}
          Icon={FavoriteIcon}
          gradient="bg-gradient-to-br from-pink-500 to-rose-600"
          loading={loading}
        />
        <StatCard
          label="Subscriptions"
          value={metrics?.totalSubscriptions?.toLocaleString()}
          Icon={VerifiedUserIcon}
          gradient="bg-gradient-to-br from-emerald-400 to-teal-600"
          loading={loading}
        />
        <StatCard
          label="Total Revenue"
          value={
            metrics?.totalRevenue != null
              ? `₦${Number(metrics.totalRevenue).toLocaleString()}`
              : null
          }
          Icon={AttachMoneyIcon}
          gradient="bg-gradient-to-br from-amber-400 to-orange-500"
          loading={loading}
        />
      </div>

      {/* Daily Visitors Chart */}
      <div className="bg-white rounded-2xl border border-purple-50 shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#2D133A]">Daily Visitors</h2>
            <p className="text-sm text-gray-500">Website traffic over the last 30 days</p>
          </div>
        </div>
        <div className="h-[300px] w-full">
          {loading ? (
            <div className="w-full h-full bg-gray-50 rounded-xl animate-pulse flex items-center justify-center text-gray-400">
              Loading chart data...
            </div>
          ) : !metrics?.visitorLogs || metrics.visitorLogs.length === 0 ? (
            <div className="w-full h-full bg-gray-50 rounded-xl flex items-center justify-center text-gray-500">
              No visitor data available yet.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={metrics.visitorLogs}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#6B7280' }} 
                  dy={10}
                  tickFormatter={(val) => {
                    const d = new Date(val);
                    return `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`;
                  }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#6B7280' }} 
                />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#2D133A', marginBottom: '4px' }}
                  labelFormatter={(val) => new Date(val).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCount)"
                  name="Visitors"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Match Breakdown */}
        <div className="bg-white rounded-2xl border border-purple-50 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUpIcon className="text-purple-500" />
            <h2 className="text-lg font-bold text-[#2D133A]">Match Breakdown</h2>
          </div>
          <div className="flex flex-col gap-3">
            <MiniStat
              label="Pending"
              value={metrics?.pendingMatches}
              Icon={HourglassTopIcon}
              color="bg-amber-400"
              loading={loading}
            />
            <MiniStat
              label="Accepted"
              value={metrics?.acceptedMatches}
              Icon={CheckCircleIcon}
              color="bg-emerald-500"
              loading={loading}
            />
            <MiniStat
              label="Declined"
              value={metrics?.declinedMatches}
              Icon={CancelIcon}
              color="bg-red-400"
              loading={loading}
            />
          </div>
        </div>

        {/* User Breakdown */}
        <div className="bg-white rounded-2xl border border-purple-50 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <PeopleIcon className="text-purple-500" />
            <h2 className="text-lg font-bold text-[#2D133A]">User Breakdown</h2>
          </div>
          <div className="flex flex-col gap-3">
            <MiniStat
              label="Active Users"
              value={metrics?.activeUsers}
              Icon={CheckCircleIcon}
              color="bg-violet-500"
              loading={loading}
            />
            <MiniStat
              label="Blocked Users"
              value={metrics?.blockedUsers}
              Icon={CancelIcon}
              color="bg-red-400"
              loading={loading}
            />
            <MiniStat
              label="Verified Users"
              value={metrics?.verifiedUsers}
              Icon={VerifiedUserIcon}
              color="bg-emerald-500"
              loading={loading}
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-purple-50 shadow-sm p-6">
        <h2 className="text-lg font-bold text-[#2D133A] mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="/admin/users"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-violet-500 text-white font-semibold rounded-xl shadow hover:opacity-90 transition text-sm"
          >
            <PeopleIcon fontSize="small" /> Manage Users
          </a>
          <a
            href="/admin/matches"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl shadow hover:opacity-90 transition text-sm"
          >
            <FavoriteIcon fontSize="small" /> View Matches
          </a>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
