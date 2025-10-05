import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SidebarComponent from "../components/sidebar/Sidebar";
import { FiCheck } from "react-icons/fi";
import { usePersistedState } from "../utils.js";
import MobileNav from "../components/sidebar/MobileBottomNav.js";
import { getPlans, verifyPaidSubscription } from "../services/index.js";
import { useAuthContext } from "../context/AuthContext.js";
import Loader from "../components/Loader.js";
import Navigation from "../components/sidebar/Navigation.js";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { Link } from "react-router-dom";
import { FaCrown } from "react-icons/fa"

const PricingPage = () => {
  const [isOpen, setIsOpen] = usePersistedState("isOpen", false);
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loadingPlan, setLoadingPlan] = useState(null); // track currently loading plan
  const { token, user } = useAuthContext();


  const childId = localStorage.getItem("childId");

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const res = await getPlans();
        setPlans(res.data);
        console.log(res)
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch plans");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const FLW_PUBLIC_KEY = "FLWPUBK-089e41d5b1a22d520c93c7f47151e53e-X"

const getFlutterwaveConfig = (plan) => ({
  public_key: process.env.REACT_APP_FLW_PUBLIC_KEY || FLW_PUBLIC_KEY,
  tx_ref: `tx-${Date.now()}`,
  amount: plan.amount,
  currency: plan.currency,
  payment_options: "card,ussd,banktransfer",
  customer: {
    email: user.email,
    phonenumber: user.phone,
    name: user.fullName,
  },
  customizations: {
    title: `Payment for ${plan.planName} by ${user.fullName || "User"}`,
    description: `Payment for ${plan.planName} by ${user.fullName || "User"}`,
  },
  callback: async (response) => {
    closePaymentModal();
    const txId = response.transaction_id;
    setLoadingPlan(null);
    try {
      const data = await verifyPaidSubscription(
        {
          txId,
          plan: plan.planName,
          amount: plan.amount,
          currency: plan.currency,
          email: user.email,
          childId: childId, // ✅ Add this line (or user.childId if that’s the correct reference)
        },
        token
      );
      toast.success(data.message);
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Payment verification failed");
    }
  },
  onClose: () => {
    setLoadingPlan(null);
  },
});


  return (
    <div className="flex flex-col sm:flex-row">
      <SidebarComponent isOpen={isOpen} toggleMenu={toggleMenu} />
      <main
        className={`${
          isOpen ? "ml-0 sm:ml-[100px]" : "ml-0 sm:ml-[280px]"
        } flex-1 overflow-y-auto transition-all duration-300 bg-gradient-to-b from-[#f8f9ff] to-[#f3f1fc]`}
      >
        <Navigation />
        {loading ? (
          <Loader />
        ) : (
          <div className="py-[32px] px-8">
            <div className="flex flex-col items-center justify-center gap-4 text-center px-8 pt-8 pb-[64px]">
              <p className="text-[#BA9FFE] font-semibold uppercase tracking-wider">
                Pricing
              </p>
              <h1 className="text-[#2D133A] font-extrabold text-4xl sm:text-5xl leading-tight">
                You are a step away from finding your future spouse.
              </h1>
              <p className="text-[#667085] text-lg max-w-2xl">
                Choose a plan that best fits your needs. Upgrade anytime.
              </p>
            </div>

            <div className="flex justify-center my-5">
            <Link
                 to="/subscription-status" // your route
                className="px-6 py-3 bg-[#BA9FFE] hover:bg-[#a37eff] text-white font-semibold rounded-lg transition-colors duration-300"
                 >
                    Check Payment Status
            </Link>
           </div>

            <div className="flex flex-wrap items-center justify-center gap-8">

              {/* Paid Plans */}
              {plans.map((plan, index) => (
                <div
                  className="w-[350px] sm:w-[400px] bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-[#eaeaea]"
                  key={index}
                >
                  <div className="flex flex-col gap-2 items-center">
                    <p className="flex items-center gap-2 text-xl text-[#2D133A] font-bold">
                        {plan.planName} 
                   <FaCrown className="text-yellow-500" />
                    </p>
                    <p className="text-4xl text-[#2D133A] font-extrabold">
                      {plan.currency === "NGN"
                        ? "₦10,000"
                        : plan.currency === "USD"
                        ? "$20"
                        : "£15"}
                      <span className="text-base text-[#667085]">/annum</span>
                    </p>
                    <p className="text-[#667085] text-center">
                      Do so much more than just browsing.
                    </p>
                  </div>

                  <div className="flex flex-col pt-8 pb-10 gap-4">
                    {plan.planDescription
                      .trim()
                      .split("\n")
                      .map((line, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                            <FiCheck className="text-[#2D133A]" />
                          </div>
                          <p className="text-[#667085]">{line.trim()}</p>
                        </div>
                      ))}
                    <div className="flex items-center gap-3">
                      <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                        <FiCheck className="text-[#2D133A]" />
                      </div>
                      <p className="text-[#667085]">Add up to 4 singles</p>
                    </div>
                  </div>

                  <FlutterWaveButton
                    {...getFlutterwaveConfig(plan)}
                    className={`w-full h-12 rounded-lg font-semibold transition-all duration-300 ${
                      loadingPlan === plan.planName
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#BA9FFE] hover:bg-[#a37eff]"
                    } text-white`}
                    onClick={() => setLoadingPlan(plan.planName)}
                    disabled={loadingPlan === plan.planName}
                  >
                    {loadingPlan === plan.planName ? "Processing..." : "Subscribe"}
                  </FlutterWaveButton>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <MobileNav />
    </div>
  );
};

export default PricingPage;
