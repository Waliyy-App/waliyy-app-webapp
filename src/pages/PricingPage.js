import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SidebarComponent from '../components/sidebar/Sidebar';
import { FiCheck } from 'react-icons/fi';
import { usePersistedState } from '../utils.js';
import MobileNav from '../components/sidebar/MobileBottomNav.js';
import { getPlans } from '../services/index.js';
import { useAuthContext } from '../context/AuthContext.js';
import Loader from '../components/Loader.js';
import Navigation from '../components/sidebar/Navigation.js';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import axios from 'axios';

const PricingPage = () => {
  const [isOpen, setIsOpen] = usePersistedState('isOpen', false);
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const { token } = useAuthContext();

  const [selectedPlan, setSelectedPlan] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);

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

  // Build Flutterwave config based on selected plan
  const flutterwaveConfig = selectedPlan
    ? {
        public_key: 'FLWPUBK_TEST-ec84603d310ebb74874cb52aa4563352-X', // replace with your public test key
        tx_ref: Date.now(),
        amount: selectedPlan.amount,
        currency: selectedPlan.currency,
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email: 'customer@example.com', // replace with logged-in user's email
          phone_number: '07012345678',
          name: 'John Doe',
        },
        customizations: {
          title: 'Subscription Payment',
          description: `Payment for ${selectedPlan.planName} plan`,
          logo: 'https://flutterwave.com/images/logo-colored.svg',
        },
      }
    : null;

  const handleFlutterPayment = useFlutterwave(flutterwaveConfig || {});

  useEffect(() => {
    if (!selectedPlan || !flutterwaveConfig) return;

    handleFlutterPayment({
      callback: async (response) => {
        console.log('Flutterwave Response:', response);
        closePaymentModal();

        try {
          // Call backend to verify payment
          const res = await axios.post(
            'http://localhost:5000/api/verify-payment',
            { transaction_id: response.transaction_id },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          console.log('Verification:', res.data);
          toast.success('Payment verified successfully!');
        } catch (err) {
          toast.error('Payment verification failed');
        } finally {
          setSelectedPlan(null); // reset after payment
        }
      },
      onClose: () => console.log('Payment modal closed'),
    });
  }, [selectedPlan]); // runs every time a plan is selected

  const handlePayment = (plan) => {
    setSelectedPlan(plan);
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
                You are a step away from finding your future spouse nn.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {/* Free Plan */}
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

              {/* Paid Plans */}
              {plans?.map((plan, index) => (
                <div
                  className="w-[400px] bg-[#F9FAFB] rounded-lg p-8"
                  key={index}
                >
                {console.log(plans)}

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

                  <button
                    className="w-full text-white font-semibold hover:bg-[#a37eff] bg-[#BA9FFE] h-12 rounded-lg transition-all duration-300"
                    onClick={() => handlePayment(plan)}
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
