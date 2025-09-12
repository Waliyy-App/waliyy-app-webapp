import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SidebarComponent from '../components/sidebar/Sidebar';
import { FiCheck } from 'react-icons/fi';
import { usePersistedState } from '../utils.js';
import MobileNav from '../components/sidebar/MobileBottomNav.js';
import { getPlans, makePayment } from '../services/index.js';
import { useAuthContext } from '../context/AuthContext.js';
import Loader from '../components/Loader.js';
import Navigation from '../components/sidebar/Navigation.js';

const PricingPage = () => {
  const [isOpen, setIsOpen] = usePersistedState('isOpen', false);
  const [loading, setLoading] = useState(false);
  // const [count, setCount] = useState(false);
  const [plans, setPlans] = useState([]);
  const { token } = useAuthContext();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handlePlans = async () => {
      setLoading(true);
      try {
        const res = await getPlans();
        setPlans(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    handlePlans();
  }, []);

  //   useEffect(() => {
  //       const showCounter = async () => {
  //         setLoading(true);
  //         try {
  //           const data = await getUsersCount();
  //           setCount(data.data);
  //         } catch (error) {
  //           toast.error(error.response.data.message);
  //         } finally {
  //           setLoading(false);
  //         }
  //       };
  //       showCounter();
  //     }, []);

  // const newCount = 200 - count;

  const handlePayment = async (provider, planId) => {
    setLoading(true);
    try {
      const res = await makePayment(
        {
          provider: provider,
        },
        token,
        planId
      );

      localStorage.setItem('selectedOrderId', res.data.id);

      window.location.href = res?.data?.data?.authorization_url;
      // : res?.data?.paymentLink;
    } catch (error) {
      toast.error(error.response.data.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <SidebarComponent isOpen={isOpen} toggleMenu={toggleMenu} />
      <main
        className={`${
          isOpen ? 'ml-0 sm:ml-[100px]' : 'ml-0 sm:ml-[280px]'
        } flex-1 overflow-y-auto transition-all duration-300 bg-[#d4c4fb1d]`}
      >
        <Navigation />
        {loading ? (
          <Loader />
        ) : (
          <div className="py-[64px] px-8">
            <div className="flex flex-col items-center justify-center gap-2 text-center px-8 pt-8 pb-[64px]">
              <p className="text-[#BA9FFE] font-bold">Pricing</p>
              <p className="text-[#2D133A] font-bold text-4xl">
                You are a step away from finding your future spouse.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="w-[400px] bg-[#F9FAFB] rounded-lg p-8">
                <div className="flex flex-col gap-2 items-center">
                  <p className="text-xl text-[#2D133A] font-bold">Free plan</p>
                  <p className="text-4xl text-[#2D133A] font-bold">₦0/annum</p>
                  <p className="text-[#667085]">Limited to browsing only.</p>
                </div>

                <div className="flex flex-col pt-8 pb-10 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                      <FiCheck className="text-[#2D133A]" />
                    </div>
                    <p className="text-[#667085]">View profiles</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                      <FiCheck className="text-[#2D133A]" />
                    </div>
                    <p className="text-[#667085]">Receive likes from others</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                      <FiCheck className="text-[#2D133A]" />
                    </div>
                    <p className="text-[#667085]">Add up to 2 singles</p>
                  </div>
                </div>

                <button
                  disabled
                  className="w-full border text-[#2D133A] font-semibold border-[#2D133A] h-12 rounded-lg"
                >
                  Current Plan
                </button>
              </div>

              {plans?.map((plan, index) => (
                <div
                  className="w-[400px] bg-[#F9FAFB] rounded-lg p-8"
                  key={index}
                >
                  <div className="flex flex-col gap-2 items-center">
                    <p className="text-xl text-[#2D133A] font-bold">
                      {plan.planName} plan
                    </p>
                    <div className="flex flex-col items-center">
                      <p className="text-4xl text-[#2D133A] font-bold">
                        {plan.currency === 'NGN'
                          ? '₦'
                          : plan.currency === 'USD'
                          ? '$'
                          : '£'}
                        {plan.amount}/annum
                      </p>
                    </div>

                    <p className="text-[#667085]">
                      Do so much more than just browsing.
                    </p>
                  </div>

                  <div className="flex flex-col pt-8 pb-10 gap-4">
                    {plan.planDescription
                      .trim()
                      .split('\n')
                      .map((line, index) => (
                        <div key={index} className="flex items-center gap-3">
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

                  <button
                    className="w-full text-white font-semibold hover:bg-[#a37eff] bg-[#BA9FFE] h-12 rounded-lg transition-all duration-300"
                    onClick={() =>
                      handlePayment(
                        plan?.currency === 'NGN'
                          ? 'paystack'
                          : plan?.currency === 'USD'
                          ? 'paystack'
                          : 'paystack',
                        plan?._id
                      )
                    }
                  >
                    Get Started
                  </button>
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