import React, { useState } from 'react';
import { FaCrown } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';

export default function PricingSection() {
  const [interval, setInterval] = useState('annual');

  const plans = {
    annual: [
      { currency: 'NGN', symbol: '₦', amount: 80000, label: 'Gold' },
      { currency: 'USD', symbol: '$', amount: 65, label: 'Gold' },
      { currency: 'GBP', symbol: '£', amount: 50, label: 'Gold' },
    ],
    monthly: [
      { currency: 'NGN', symbol: '₦', amount: 5000, label: 'Silver' },
      { currency: 'USD', symbol: '$', amount: 6.5, label: 'Silver' },
      { currency: 'GBP', symbol: '£', amount: 5, label: 'Silver' },
    ],
  };

  const features = [
    'View profiles',
    'Receive likes from others',
    'Like Other Profiles',
    'Make matches',
    'Cancel matches',
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#f8f4ff] to-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-[#2D133A]">
          Our Pricing Plans
        </h2>

        {/* Toggle Switch */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <span className={`text-sm font-medium ${interval === 'monthly' ? 'text-[#2D133A]' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setInterval(interval === 'annual' ? 'monthly' : 'annual')}
            className="relative w-14 h-7 bg-[#BA9FFE] rounded-full p-1 transition-colors duration-300 focus:outline-none"
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${interval === 'annual' ? 'translate-x-7' : 'translate-x-0'
                }`}
            />
          </button>
          <span className={`text-sm font-medium ${interval === 'annual' ? 'text-[#2D133A]' : 'text-gray-500'}`}>
            Annual
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans[interval].map((plan, index) => (
            <div
              key={plan.currency}
              className="bg-white rounded-2xl shadow-lg p-6 border border-[#e9defe] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="mb-6">
                <h3 className="flex items-center justify-center gap-2 text-xl font-bold text-[#2D133A] mb-2">
                  {plan.label}
                  <FaCrown
                    className={interval === 'annual' ? 'text-yellow-500' : 'text-gray-400'}
                  />
                </h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-extrabold text-[#2D133A]">
                    {plan.symbol}
                    {plan.amount.toLocaleString()}
                  </span>
                  <span className="text-gray-500 ml-1 text-sm">
                    /{interval === 'annual' ? 'annum' : 'month'}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-[#f0f0f5]">
                <div className="space-y-3">
                  {features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      <div className="bg-[#f0e9ff] h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FiCheck className="text-[#6d28d9] w-3 h-3" />
                      </div>
                      <p className="text-[#2D133A] text-left text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
