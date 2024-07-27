import React, { useState, useEffect } from 'react';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { getChild } from '../../services/index.js';
import { useAuthContext } from '../../context/AuthContext.js';
import { toast } from 'react-toastify';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { getChildren, logoutFunc } from '../../services';
import { ThreeDots } from 'react-loader-spinner';
import Logo from '../../assets/logo/Untitled-1-01.jpg';

const Navigation = () => {
  const [child, setChild] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [children, setChildren] = useState([]);
  const { token, logOut, handleChildId } = useAuthContext();
  const childId = localStorage.getItem('childId');

  const goFilter = () => {
    navigate('/filter', { state: { from: '/dashboard' } });
  };

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
    <div className="flex justify-between items-center p-8 shadow-xl  text-[#2D133A] sticky top-0 bg-white w-full z-[100]">
      {loading ? (
        username
      ) : (
        <p className=" text-2xl font-semibold">{child?.firstName}</p>
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
            <Link className="flex sm:hidden h-[50px] w-[50px] mx-auto" to="/dashboard">
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

            <NavLink
              to="/get-started"
              className="flex items-center py-2 px-3 h-[64px] gap-3 rounded-md font-semibold hover:text-white hover:bg-[#BA9FFE] transition duration-300"
            >
              <AddIcon /> Add Account
            </NavLink>

            <div className="border border-[#2D133A] w-full mt-10 mb-4"></div>

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
