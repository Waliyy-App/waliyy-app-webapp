import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SidebarComponent from '../components/sidebar/Sidebar';
import MobileNav from '../components/sidebar/MobileBottomNav';
import Navigation from '../components/sidebar/Navigation';
import Loader from '../components/Loader';
import { FiCheck } from 'react-icons/fi';
import { FaGift, FaCrown } from 'react-icons/fa';
import { usePersistedState } from '../utils.js';
import { getPromoPlan, makePromoPayment } from '../services/index.js';
import { useAuthContext } from '../context/AuthContext.js';

const CURRENCY_OPTIONS = [
  { code: 'NGN', symbol: '₦', amount: 5000, label: 'NGN (₦5,000)' },
  { code: 'EUR', symbol: '€', amount: 5, label: 'EUR (€5)' },
  { code: 'USD', symbol: '$', amount: 6.5, label: 'USD ($6.50)' },
];

const FEATURES = [
  '3 months of full access',
  'View profiles',
  'Receive likes from others',
  'Like other profiles',
  'Make matches',
  'Cancel matches',
];

const PromoPricingPage = () => {
  const [isOpen, setIsOpen] = usePersistedState('isOpen', false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [promo, setPromo] = useState(null);
  const [currency, setCurrency] = useState('NGN');
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handlePromo = async () => {
      try {
        const res = await getPromoPlan();
        setPromo(res?.data || res);
      } catch (error) {
        toast.error(error.response?.data?.message || 'This offer is no longer available');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    handlePromo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selected = CURRENCY_OPTIONS.find((c) => c.code === currency) || CURRENCY_OPTIONS[0];

  const formatAmount = (val) =>
    val % 1 === 0 ? val.toLocaleString() : val.toFixed(2);

  const handlePayment = async () => {
    setProcessing(true);
    try {
      const res = await makePromoPayment(
        {
          provider: 'paystack',
          currency,
          callbackUrl: `${window.location.origin}/dashboard`,
        },
        token
      );

      localStorage.setItem('selectedOrderId', '');
      window.location.href = res?.data?.data?.authorization_url;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  const endDate = promo?.endDate ? new Date(promo.endDate).toLocaleDateString() : 'September 30, 2026';

  return (
    <div className="flex flex-col sm:flex-row">
      <SidebarComponent isOpen={isOpen} toggleMenu={toggleMenu} />
      <main
        className={`${isOpen ? 'ml-0 sm:ml-[100px]' : 'ml-0 sm:ml-[280px]'
          } flex-1 overflow-y-auto transition-all duration-300 bg-[#d4c4fb1d]`}
      >
        <Navigation />
        {loading ? (
          <Loader />
        ) : (
          <div className="py-[64px] px-4 sm:px-8">
            <div className="max-w-2xl mx-auto text-center pt-6 pb-8 px-2">
              <div className="inline-flex items-center gap-2 bg-[#2D133A] text-[#BA9FFE] px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-sm">
                <FaCrown className="text-yellow-400" /> Limited-Time September Offer
              </div>
              <h1 className="text-[#2D133A] font-extrabold text-3xl sm:text-4xl mt-4">
                3 months for the price of 1
              </h1>
              <p className="text-[#665e6b] max-w-md mx-auto mt-3 text-sm sm:text-base">
                Why pay <strong>{selected.symbol}{formatAmount(selected.amount)} every month</strong> when
                one payment unlocks 3 full months of access?
              </p>
              <p className="inline-flex items-center gap-1 mt-4 text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-full">
                Offer ends {endDate}
              </p>
            </div>

            <div className="flex justify-center px-2 pb-8">
              <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl overflow-hidden border border-[#BA9FFE]">
                {/* Card header */}
                <div className="bg-gradient-to-r from-[#2D133A] to-[#4A2A63] px-5 py-3.5 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <FaGift className="text-[#BA9FFE] text-base" />
                    <h3 className="text-white text-lg font-extrabold">
                      September 3-Month Promo
                    </h3>
                  </div>
                  <p className="text-[#BA9FFE] text-xs mt-0.5">Offer ends {endDate}</p>
                </div>

                <div className="p-5 sm:p-6">
                  {/* Price */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-4xl font-extrabold text-[#2D133A]">
                        {selected.symbol}{formatAmount(selected.amount)}
                      </span>
                      <span className="text-gray-500 text-sm mt-2">/ 3 months</span>
                    </div>
                    <p className="text-[#665e6b] text-sm mt-1.5">
                      <span className="line-through text-gray-400">Normally {selected.symbol}{formatAmount(selected.amount)}/month</span>{' '}
                      <span className="text-emerald-600 font-bold">— save 66%</span>
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mt-4">
                    <p className="text-sm font-bold text-[#2D133A] mb-2">What you get</p>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                      {FEATURES.map((line, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="bg-[#BA9FFE]/20 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0">
                            <FiCheck className="text-[#2D133A] text-xs" />
                          </div>
                          <p className="text-[#667085] text-[13px] leading-tight">{line}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Currency selector */}
                  <div className="mt-4">
                    <p className="text-sm font-bold text-[#2D133A] mb-2">Select your currency</p>
                    <div className="grid grid-cols-3 gap-2">
                      {CURRENCY_OPTIONS.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => setCurrency(c.code)}
                          className={`py-2 rounded-lg border text-sm font-semibold transition-colors ${
                            currency === c.code
                              ? 'bg-[#2D133A] text-white border-[#2D133A] shadow-md'
                              : 'bg-white text-[#2D133A] border-gray-200 hover:border-[#BA9FFE]'
                          }`}
                        >
                          {c.label.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pay */}
                  <div className="mt-4">
                    <button
                      disabled={processing}
                      onClick={handlePayment}
                      className="w-full text-white font-semibold hover:bg-[#a37eff] bg-[#2D133A] h-11 rounded-lg transition-all duration-300 disabled:opacity-60 shadow-lg shadow-[#2D133A]/20"
                    >
                      {processing ? 'Processing...' : `Pay ${selected.symbol}${formatAmount(selected.amount)} — Get Started`}
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-2">Secure payment via Paystack.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <MobileNav />
    </div>
  );
};

export default PromoPricingPage;
