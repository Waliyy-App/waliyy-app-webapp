import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGift } from 'react-icons/fa';
import { getPromoPlan } from '../../services/index.js';

const PROMO_END = new Date('2026-09-30T23:59:59');

/**
 * September 3-Month Promo banner shown on the public homepage.
 * Fetches the promo availability from the backend. After the campaign
 * window ends, the banner is hidden automatically.
 */
const SeptemberPromoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const resolved = usePromoState();

  useEffect(() => {
    setIsVisible(resolved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolved]);

  if (!isVisible) return null;

  return (
    <div className="relative w-full bg-gradient-to-r from-[#2D133A] via-[#4A2A63] to-[#2D133A] text-white px-3 sm:px-6 py-1.5 sm:py-3 shadow-md border-b border-[#BA9FFE]/30 z-[40]">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 sm:gap-4 text-center">
        <FaGift className="text-[#BA9FFE] text-sm sm:text-lg animate-pulse flex-shrink-0" />
        <p className="text-xs sm:text-base text-white font-semibold leading-tight">
          <span className="text-[#BA9FFE] font-bold">September Special:</span>{' '}
          <span className="sm:hidden">3 months for just <span className="font-bold">₦5,000</span></span>
          <span className="hidden sm:inline">
            Get 3 months for just <span className="font-bold">₦5,000</span>{' '}
            (€5 / $6.50) — instead of paying every month!
          </span>
        </p>
        <Link
          to="/promo-pricing"
          className="flex-shrink-0 px-3 sm:px-4 py-1 sm:py-2 bg-[#BA9FFE] hover:bg-[#a37eff] text-white text-xs sm:text-sm font-bold rounded-lg shadow-lg transition-all duration-300 whitespace-nowrap"
        >
          <span className="sm:hidden">Get Offer</span>
          <span className="hidden sm:inline">Get the September Offer</span>
        </Link>
      </div>
    </div>
  );
};

/** Returns true if promo is available based on backend promo fetch. */
function usePromoState() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    // Client-side sanity check
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

export default SeptemberPromoBanner;
