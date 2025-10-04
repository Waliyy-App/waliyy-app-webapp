import React from 'react';
import { FaCrown } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';

export default function PricingSection() {
  return (
    <section className="py-32 px-4 bg-gradient-to-b from-[#f8f4ff] to-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-center text-3xl font-bold mb-20 text-[#2D133A]">
          Our Pricing Plans
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-6xl mx-auto mb-10">
          {/* Basic Plan - $20/annum */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#e9defe] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full">
            <div className="mb-6">
              <h3 className="flex items-center justify-center gap-2 text-2xl font-bold text-[#2D133A] mb-2">
                Elite
                <FaCrown className="text-yellow-500" />
              </h3>
              <div className="flex items-end justify-center">
                <span className="text-4xl font-bold">$20</span>
                <span className="text-[#2D133A] ml-1">/annum</span>
              </div>
            </div>

            <div className="pt-6 pb-8 border-t border-[#f0f0f5]">
              <div className="space-y-4">
                {['View profiles', 'Receive likes from others', 'Like Other Profiles', 'Make matches', 'Cancel matches'].map(
                  (feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-[#f0e9ff] h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FiCheck className="text-[#6d28d9]" />
                      </div>
                      <p className="text-[#2D133A] text-left">{feature}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Standard Plan - £15/annum */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#e9defe] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full">
            <div className="mb-6">
              <h3 className="flex items-center justify-center gap-2 text-2xl font-bold text-[#2D133A] mb-2">
                Elite
                <FaCrown className="text-yellow-500" />
              </h3>
              <div className="flex items-end justify-center">
                <span className="text-4xl font-bold">£15</span>
                <span className="text-[#2D133A] ml-1">/annum</span>
              </div>
            </div>

            <div className="pt-6 pb-8 border-t border-[#f0f0f5]">
              <div className="space-y-4">
                {['View profiles', 'Receive likes from others', 'Like Other Profiles', 'Make matches', 'Cancel matches'].map(
                  (feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-[#f0e9ff] h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FiCheck className="text-[#6d28d9]" />
                      </div>
                      <p className="text-[#2D133A] text-left">{feature}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Premium Plan - ₦10,000/annum */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#e9defe] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full">
            <div className="mb-6">
              <h3 className="flex items-center justify-center gap-2 text-2xl font-bold text-[#2D133A] mb-2">
                Elite
                <FaCrown className="text-yellow-500" />
              </h3>
              <div className="flex items-end justify-center">
                <span className="text-4xl font-bold">₦10,000</span>
                <span className="text-[#2D133A] ml-1">/annum</span>
              </div>
            </div>

            <div className="pt-6 pb-8 border-t border-[#f0f0f5]">
              <div className="space-y-4">
                {['View profiles', 'Receive likes from others', 'Like Other Profiles', 'Make matches', 'Cancel matches'].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-[#f0e9ff] h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FiCheck className="text-[#6d28d9]" />
                    </div>
                    <p className="text-[#2D133A] text-left">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
