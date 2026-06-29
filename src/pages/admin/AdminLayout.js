import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ShieldIcon from "@mui/icons-material/Shield";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../assets/logo/logo-nobg-cropped.png";
import LogoIcon from "../../assets/logo/logo-icon.png";

const navItems = [
  { to: "/admin", label: "Overview", Icon: DashboardIcon, exact: true },
  { to: "/admin/users", label: "Users", Icon: PeopleIcon },
  { to: "/admin/matches", label: "Matches", Icon: FavoriteIcon },
  { to: "/admin/subscriptions", label: "Subscribers", Icon: ShieldIcon }, // Using ShieldIcon temporarily or VerifiedUserIcon
];

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logOut, user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center mb-10 ${collapsed ? "justify-center" : "justify-between"}`}>
        <NavLink to="/admin">
          <img
            src={collapsed ? LogoIcon : Logo}
            alt="Waliyy Admin"
            className={collapsed ? "h-10 w-10 object-contain" : "h-16 w-36 object-contain"}
          />
        </NavLink>
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded-md border border-purple-300 text-purple-600 hover:bg-purple-100 transition"
          >
            <ChevronLeftIcon fontSize="small" />
          </button>
        )}
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="mt-2 p-1 rounded-md border border-purple-300 text-purple-600 hover:bg-purple-100 transition"
          >
            <ChevronRightIcon fontSize="small" />
          </button>
        )}
      </div>

      {/* Admin Badge */}
      {!collapsed && (
        <div className="mb-6 px-3 py-2 rounded-lg bg-purple-100 border border-purple-200 flex items-center gap-2">
          <ShieldIcon className="text-purple-600" fontSize="small" />
          <div>
            <p className="text-xs text-purple-500 font-semibold uppercase tracking-widest">Admin Panel</p>
            <p className="text-sm font-bold text-purple-800 truncate">{user?.firstName} {user?.lastName}</p>
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-xl font-semibold transition-all duration-200 ${
                collapsed ? "justify-center" : ""
              } ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-md"
                  : "text-[#2D133A] hover:bg-purple-100 hover:text-purple-700"
              }`
            }
          >
            <Icon fontSize="small" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom: Back to App & Logout */}
      <div className="flex flex-col gap-2 mt-6 pt-4 border-t border-purple-200">
        <NavLink
          to="/dashboard"
          className={`flex items-center gap-3 px-3 py-3 rounded-xl text-[#2D133A] font-semibold hover:bg-purple-100 transition ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <ChevronLeftIcon fontSize="small" />
          {!collapsed && <span>Back to App</span>}
        </NavLink>
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 font-semibold hover:bg-red-50 transition ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogoutIcon fontSize="small" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F7F3FF]">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden sm:flex flex-col fixed inset-y-0 left-0 bg-white border-r border-purple-100 shadow-sm transition-all duration-300 z-20 overflow-y-auto ${
          collapsed ? "w-[80px] px-2 py-6" : "w-[260px] px-6 py-8"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="sm:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-purple-100 shadow-sm flex items-center justify-between px-4 py-3">
        <NavLink to="/admin">
          <img src={LogoIcon} alt="Waliyy" className="h-9 w-9 object-contain" />
        </NavLink>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2 py-1 rounded-lg border border-purple-200">
            Admin
          </span>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl border border-purple-200 text-purple-600"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="sm:hidden fixed inset-0 z-20 bg-black bg-opacity-40"
          onClick={() => setMobileOpen(false)}
        >
          <aside
            className="absolute top-0 left-0 h-full w-[260px] bg-white px-6 py-8 flex flex-col shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "sm:ml-[80px]" : "sm:ml-[260px]"
        } pt-16 sm:pt-0 min-h-screen`}
      >
        <div className="p-6 md:p-10">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
