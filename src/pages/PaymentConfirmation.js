import React, { useEffect, useState } from 'react';
import ClapLogo from '../assets/illustrations/tick.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import { getOrderID } from '../services';
import { toast } from 'react-toastify';

const PaymentConfirmation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [orderID, setOrderID] = useState();
  const planID = localStorage.getItem('selectedOrderId');

  const { token } = useAuthContext();

  useEffect(() => {
    const fetchOrderID = async () => {
      setLoading(true);
      try {
        const res = await getOrderID(planID, token);
        setOrderID(res);
        console.log(orderID);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderID();
  }, [token, planID, orderID]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-100 h-screen bg-white flex flex-col items-center justify-center">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-[360px] mx-auto ">
          <img src={ClapLogo} alt="." className="w-[150px] h-[150px] mx-auto" />
          <div className="flex flex-col items-center jutify-center mt-8">
            <p className="text-2xl text-[#2D133A] font-medium mb-3">
              Thank You for Your Payment!
            </p>
            <p className="text-[#665e6b] text-center font-normal">
              You will be redirected shortly. Click
              <NavLink to="/dashboard" className="text-blue-500 underline">
                {' '}
                here
              </NavLink>{' '}
              if not redirected.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentConfirmation;
