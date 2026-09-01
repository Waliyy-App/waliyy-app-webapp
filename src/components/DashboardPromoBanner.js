import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGift } from 'react-icons/fa';
import { getPromoPlan } from '../services/index.js';

const PROMO_END = new Date('2026-09-30T23:59:59');

/**
 * September 3-Month Promo banner shown on the authenticated dashboard.
 * Hidden automatically after the campaign window ends (backend is the
 * final authority, this is just UX).
 */
const DashboardPromoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const resolved = usePromoState();

  useEffect(() => {
    setIsVisible(resolved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolved]);

  if (!isVisible) return null;

  return (
    <div className="relative mx-4 sm:mx-8 my-3 rounded-xl bg-gradient-to-r from-[#2D133A] via-[#3d1f52] to-[#2D133A] text-white px-3 sm:px-5 py-2 sm:py-3 shadow-lg border border-[#BA9FFE]/40 overflow-hidden">
      <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-[#BA9FFE]/20 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-4 h-24 w-24 rounded-full bg-[#a37eff]/20 blur-2xl pointer-events-none" />

      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <FaGift className="text-[#BA9FFE] text-sm sm:text-base animate-pulse flex-shrink-0" />
          <div className="min-w-0 leading-tight">
            <p className="text-[10px] sm:text-[11px] font-bold text-[#BA9FFE] uppercase tracking-wider">
              Limited-Time September Offer
            </p>
            <p className="text-xs sm:text-sm text-white font-semibold truncate">
              3 months for just <span className="font-extrabold text-[#FFD700]">₦5,000</span>
              <span className="hidden lg:inline"> (€5 / $6.50) — instead of paying every month!</span>
            </p>
          </div>
        </div>
        <Link
          to="/promo-pricing"
          className="flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#BA9FFE] to-[#a37eff] hover:from-[#a37eff] hover:to-[#8D6BE8] text-white text-xs sm:text-sm font-bold rounded-lg shadow-md transition-all duration-300 whitespace-nowrap"
        >
          Get the Offer
        </Link>
      </div>
    </div>
  );
};

/** Returns true if promo is available based on backend promo fetch. */
function usePromoState() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const now = new Date();
    if (now > PROMO_END) {
      setAvailable(false);
      return;
    }
    getPromoPlan()
      .then(() => setAvailable(true))
      .catch(() => setAvailable(false));
  }, []);

  return available;
}

export default DashboardPromoBanner;
