import React from 'react';
import { FiCheck } from 'react-icons/fi';

export default function PricingSection() {
  return (
    <section className="card-body py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl text-[#2d133a] font-bold mb-4">
          Choose Your Plan
        </h2>
        <p className="text-[#2d133a] mb-12 text-lg">
          You are a step away from finding your future spouse.
        </p>

        <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Free Plan */}
          <div className="white-card rounded-2xl shadow-md p-8 border border-[#BA9FFE]">
            <h3 className="text-2xl font-semibold text-[#2D133A] mb-4">
              Free Plan
            </h3>
            <div className="flex flex-col pt-8 pb-10 gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                  <FiCheck className="text-[#2D133A]" />
                </div>
                <p className="text-[#2D133A]">View profiles</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                  <FiCheck className="text-[#2D133A]" />
                </div>
                <p className="text-[#2D133A]">Receive likes from others</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                  <FiCheck className="text-[#2D133A]" />
                </div>
                <p className="text-[#2D133A]">Add up to 2 singles</p>
              </div>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="card text-white rounded-2xl shadow-2xl p-8 ]">
            <h3 className="text-2xl font-semibold mb-4">Premium Plan</h3>
            <div className="flex flex-col pt-8 pb-10 gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                  <FiCheck className="text-[#2D133A]" />
                </div>
                <p className="">View profiles</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                  <FiCheck className="text-[#2D133A]" />
                </div>
                <p className="">Receive likes from others</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                  <FiCheck className="text-[#2D133A]" />
                </div>
                <p className="">Like Other Profiles</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                  <FiCheck className="text-[#2D133A]" />
                </div>
                <p className="">Make Matches</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                  <FiCheck className="text-[#2D133A]" />
                </div>
                <p className="">Unmatch Profile</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#dacdff] h-6 w-6 rounded-full flex items-center justify-center">
                  <FiCheck className="text-[#2D133A]" />
                </div>
                <p className="">Add up to 4 singles</p>
              </div>
            </div>
          </div>
        </div>

        <button className="w-4/5 mx-auto mt-14 py-3 rounded-xl border border-[#BA9FFE] bg-[#2d133a] text-white font-semibold transition">
          Get Started
        </button>
      </div>
    </section>
  );
}
