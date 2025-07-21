import React from 'react';
import { FiCheck } from 'react-icons/fi';

export default function PricingSection() {
  return (
    <section className="py-32 px-4 bg-gradient-to-b from-[#f8f4ff] to-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-center text-3xl font-bold mb-20 text-[#2D133A]">
          Our Pricing Plans
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-10">
          {/* Free Plan - Most Popular */}
          <div className="relative rounded-2xl overflow-hidden">
            
            <div className="bg-[#a37eff37] text-[#2D133A] rounded-2xl shadow-xl p-8 border border-[#e9defe] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#2D133A] mb-2">
                  Free Plan
                </h3>
                <div className="text-4xl font-bold text-[#2D133A] mb-1">₦0</div>
                <p className="text-[#7c7c8d]">Forever free</p>
              </div>

              <div className="pt-6 pb-8 border-t border-[#8b6cef]">
                <div className="space-y-4">
                  {['View profiles', 'Receive likes from others'].map(
                    (feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="bg-[#f0e9ff] h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FiCheck className="text-[#6d28d9]" />
                        </div>
                        <p className="text-left">{feature}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Basic Plan - $20/annum */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#e9defe] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#2D133A] mb-2">
                Premium Plan
              </h3>
              <div className="flex items-end justify-center">
                <span className="text-4xl font-bold">$20</span>
                <span className="text-[#2D133A] ml-1">/annum</span>
              </div>
            </div>

            <div className="pt-6 pb-8 border-t border-[#f0f0f5]">
              <div className="space-y-4">
                {['View profiles', 'Receive likes from others', 'Like Other Profiles', 'Make matches', 'Unmatch Profile'].map(
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
              <h3 className="text-2xl font-bold text-[#2D133A] mb-2">
                Premium Plan
              </h3>
              <div className="flex items-end justify-center">
                <span className="text-4xl font-bold">£15</span>
                <span className="text-[#2D133A] ml-1">/annum</span>
              </div>
            </div>

            <div className="pt-6 pb-8 border-t border-[#f0f0f5]">
              <div className="space-y-4">
                {['View profiles', 'Receive likes from others', 'Like Other Profiles', 'Make matches', 'Unmatch Profile'].map(
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
              <h3 className="text-2xl font-bold text-[#2D133A] mb-2">
                Premium Plan
              </h3>
              <div className="flex items-end justify-center">
                <span className="text-4xl font-bold">₦30,000</span>
                <span className="text-[#2D133A] ml-1">/annum</span>
              </div>
            </div>

            <div className="pt-6 pb-8 border-t border-[#f0f0f5]">
              <div className="space-y-4">
                {['View profiles', 'Receive likes from others', 'Like Other Profiles', 'Make matches', 'Unmatch Profile'].map((feature, index) => (
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