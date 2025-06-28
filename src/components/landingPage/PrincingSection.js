import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function PricingSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#f8f4ff] to-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] mb-4">
          Choose Your Plan
        </h2>
        <p className="text-[#2d133a] mb-12 text-lg max-w-2xl mx-auto">
          You're just one step away from finding your future spouse. Select the plan that works best for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan - Enhanced */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#e9defe] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#2D133A] mb-2">Free Plan</h3>
              <div className="text-4xl font-bold text-[#6d28d9] mb-1">$0</div>
              <p className="text-[#7c7c8d]">Forever free</p>
            </div>
            
            <div className="pt-6 pb-8 border-t border-[#f0f0f5]">
              <div className="space-y-4">
                {[
                  "View profiles",
                  "Receive likes from others",
                  "Add up to 2 singles"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-[#f0e9ff] h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FiCheck className="text-[#6d28d9]" />
                    </div>
                    <p className="text-[#2D133A] text-left">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <Link to="/sign-up">
            <button className="w-full py-3.5 rounded-xl border-2 border-[#8b5cf6] text-[#6d28d9] font-semibold transition-all hover:bg-[#f5f3ff] hover:border-[#7c3aed]">
              Get Started Free
            </button>
            </Link>
          </div>

          {/* Premium Plan - Enhanced */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:-translate-y-1">
            {/* Premium badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
              MOST POPULAR
            </div>
            
            <div className="bg-gradient-to-br from-[#6d28d9] to-[#4c1d95] text-white p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Premium Plan</h3>
                <div className="flex items-end justify-center">
                  <span className="text-4xl font-bold">$10</span>
                  <span className="text-[#e0d7ff] ml-1">/month</span>
                </div>
                <p className="text-[#d8cbfc]">Billed annually or $12 month-to-month</p>
              </div>
              
              <div className="pt-6 pb-8 border-t border-[#8b6cef]">
                <div className="space-y-4">
                  {[
                    "View profiles",
                    "Receive likes from others",
                    "Like Other Profiles",
                    "Make Matches",
                    "Unmatch Profile",
                    "Add up to 4 singles"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-white/20 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FiCheck className="text-white" />
                      </div>
                      <p className="text-left">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

             <Link to="">
              <button className="w-full py-3.5 rounded-xl bg-white text-[#6d28d9] font-bold transition-all hover:bg-[#f5f3ff] hover:scale-[1.02]">
                Get Premium
              </button>
            </Link> 
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}