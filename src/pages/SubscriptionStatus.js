import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiCheck, FiClock } from "react-icons/fi";
import Loader from "../components/Loader";
import {  getSubscribedUser } from "../services/index.js";
import { useAuthContext } from "../context/AuthContext.js";
import { Link } from "react-router-dom";

const SubscriptionStatus = () => {
  const [status, setStatus] = useState(null); // null | "pending" | "successful"
  const [loading, setLoading] = useState(true);
  const { token } = useAuthContext();

  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      try {
        const res = await getSubscribedUser(token); // your endpoint
        setStatus(res.status); // assuming backend returns { paymentStatus: "pending" }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch subscription status");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [token]);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#f8f9ff] to-[#f3f1fc] p-8">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center border border-[#eaeaea]">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2D133A] mb-4">
          Subscription Status
        </h1>

        {status === "active" ? (
          <div className="flex flex-col items-center gap-3">
            <div className="bg-green-100 h-16 w-16 rounded-full flex items-center justify-center">
              <FiCheck className="text-green-600 text-2xl" />
            </div>
            <p className="text-green-700 font-semibold text-lg">
              Payment Successful
            </p>
            <p className="text-[#667085]">
              Thank you! You now have full access to your plan.
            </p>
          </div>
        ) : status === "pending" ? (
          <div className="flex flex-col items-center gap-3">
            <div className="bg-yellow-100 h-16 w-16 rounded-full flex items-center justify-center">
              <FiClock className="text-yellow-600 text-2xl animate-pulse" />
            </div>
            <p className="text-yellow-700 font-semibold text-lg">
              Payment Pending
            </p>
            <p className="text-[#667085]">
             Your payment is being processed. Kindly check back in a few minutes.
            </p>
            <p className="text-[#667085]">
             You will get access once it is confirmed.
            </p>
          </div>
        ) : (
          <p className="text-[#BA9FFE] font-semibold text-lg">
            No subscription found
          </p>
        )}
      </div>

      <div className="flex justify-center mt-4">
       <Link to="/dashboard" // your dashboard route
        className="px-6 py-3 bg-[#BA9FFE] hover:bg-[#a37eff] text-white font-semibold rounded-lg transition-colors duration-300"
        >
           Back to Dashboard
         </Link>
    </div>
    </div>
  );
};

export default SubscriptionStatus;
