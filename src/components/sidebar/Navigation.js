import React, { useState, useEffect } from 'react';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { FaCrown } from 'react-icons/fa';
import { getChild, getCurrentPlan } from '../../services/index.js';
import { useAuthContext } from '../../context/AuthContext.js';
import { toast } from 'react-toastify';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
// import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SettingsIcon from '@mui/icons-material/Settings';
import { getChildren, logoutFunc } from '../../services';
import { ThreeDots } from 'react-loader-spinner';
import Logo from '../../assets/logo/Untitled-1-01.jpg';

const Navigation = () => {
  const [child, setChild] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [children, setChildren] = useState([]);
  const [activePlan, setActivePlan] = useState(null);
  const { token, logOut, handleChildId } = useAuthContext();
  const childId = localStorage.getItem('childId');

  const goFilter = () => {
    navigate('/filter', { state: { from: '/dashboard' } });
  };
  console.log(activePlan)
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const res = await getChildren(token);
        setChildren(res.data);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchChildren();
  }, [token]);

  useEffect(() => {
    async function getChildDetails() {
      setLoading(true);
      try {
        const res = await getChild(childId, token);
        setChild(res?.data);
      } catch (err) {
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    }

    getChildDetails();
  }, [childId, token]);

  useEffect(() => {
    const fetchActivePlan = async () => {
      try {
        const res = await getCurrentPlan(token);
        setActivePlan(res?.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (token) fetchActivePlan();
  }, [token]);

  const handleChildLogin = (id) => {
    handleChildId(id);
    navigate('/dashboard');
    setOpenDropdown(false);
  };

  const handleLogout = async () => {
    try {
      const res = await logoutFunc(token);
      logOut();
      navigate('/');
      toast.success(res.message);
    } catch (error) {
      toast.error(error.response.data.message);
      logOut();
      navigate('/login');
    }
  };

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const username = (
    <ThreeDots
      visible={true}
      height="24"
      width="24"
      color="#2D133A"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );

  return (
    <div className="flex justify-between items-center p-8 shadow-xl text-[#2D133A] sticky top-0 bg-white w-full z-[100]">
      {loading ? (
        username
      ) : (
        <div className="flex items-center gap-4">
          <p className=" text-2xl font-semibold">{child?.firstName}</p>
          {activePlan ? (
            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-black tracking-wider uppercase shadow-md transition-all duration-300 transform hover:scale-105 ${activePlan.payment.duration === 12
                ? 'bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#D4AF37] text-white shadow-yellow-200'
                : 'bg-gradient-to-r from-[#C0C0C0] via-[#D3D3D3] to-[#808080] text-white shadow-gray-200'
              }`}>
              <FaCrown className={activePlan.payment.duration === 12 ? 'text-white' : 'text-white'} size={14} />
              {activePlan.payment.duration === 12 ? 'Gold' : 'Silver'}
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-black tracking-wider uppercase bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] text-white shadow-md shadow-red-200 animate-pulse">
              No Active Plan
            </div>
          )}
        </div>
      )}
      <div className="flex gap-4 items-center relative">
        <button
          onClick={goFilter}
          className="h-12 w-12 flex items-center justify-center bg-[#a37eff] rounded-full"
        >
          <HiOutlineAdjustmentsHorizontal className="text-white text-3xl" />
        </button>

        <button
          onClick={toggleDropdown}
          className="h-12 w-12 flex items-center justify-center bg-[#a37eff] rounded-full"
        >
          <PersonIcon className="text-white text-3xl" />
        </button>

        {openDropdown && (
          <div className="flex flex-col bg-white p-4 rounded-2xl absolute top-16 right-0 w-[200px] z-[100] shadow">
            <Link
              className="flex sm:hidden h-[50px] w-[50px] mx-auto"
              to="/dashboard"
            >
              <img
                src={Logo}
                alt="logo"
                className="h-full w-full object-fill rounded-2xl"
              />
            </Link>
            {children && (
              <div className="flex flex-col text-[#2D133A] px-3">
                <p className="text-xs my-6 flex items-center gap-1">
                  Switch Accounts
                  <SwapHorizIcon />
                </p>
                <div className="flex flex-col max-h-[120px] overflow-y-auto">
                  {children.map((child, index) => (
                    <button
                      onClick={() => handleChildLogin(child?.id)}
                      className="flex p-2 rounded-md gap-3 items-center hover:text-white hover:bg-[#BA9FFE] font-medium"
                      key={index}
                    >
                      <PersonIcon /> {child.firstName}
                    </button>
                  ))}
                </div>
              </div>
            )}



            <div className="border border-[#2D133A] w-full mt-10 mb-4"></div>

            <NavLink
              to="/settings"
              className="flex sm:hidden items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300"
            >
              <SettingsIcon /> Settings
            </NavLink>

            <button
              className="flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300"
              onClick={() => handleLogout()}
            >
              <LogoutIcon /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
