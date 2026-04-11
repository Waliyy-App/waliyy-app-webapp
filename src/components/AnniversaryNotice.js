import React, { useState, useEffect } from 'react';
import { FaTimes, FaBirthdayCake, FaStar } from 'react-icons/fa';

const AnniversaryNotice = ({ variant = 'banner', isClosable = true }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // For modal variant, respect the dismissal state
    if (variant === 'modal') {
      const isDismissed = sessionStorage.getItem('anniversary_modal_dismissed');
      if (!isDismissed) {
        setIsVisible(true);
      }
    } else {
      // Banners (like on home page) are always visible if not closable
      setIsVisible(true);
    }
  }, [variant]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (variant === 'modal') {
      sessionStorage.setItem('anniversary_modal_dismissed', 'true');
    }
  };

  if (!isVisible) return null;

  // Modal Variant
  if (variant === 'modal') {
    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-[#2D133A]/60 backdrop-blur-sm animate-fadeIn">
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden max-w-lg w-full p-8 text-center border border-[#BA9FFE]/20">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#2D133A] via-[#BA9FFE] to-[#2D133A]"></div>
          
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-[#BA9FFE]/10 rounded-full animate-bounce">
            <FaBirthdayCake className="text-4xl text-[#BA9FFE]" />
          </div>

          <h2 className="text-3xl font-extrabold text-[#2D133A] mb-4">
            Happy 1st Anniversary! 🎊
          </h2>
          
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            We're celebrating one year of connecting hearts on <span className="text-[#BA9FFE] font-bold">WaliyyApp</span>. 
            Thank you for being part of our amazing community!
          </p>

          <button
            onClick={handleDismiss}
            className="w-full py-4 bg-[#BA9FFE] hover:bg-[#a37eff] text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-[#BA9FFE]/30"
          >
            Let's Celebrate!
          </button>
          
          {isClosable && (
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Small Banner Variant (Home Page)
  return (
    <div className="relative w-full bg-[#2D133A] text-white py-4 px-4 flex items-center justify-center gap-3 shadow-md border-b border-[#BA9FFE]/20 z-[50]">
      <FaStar className="text-yellow-400 text-lg animate-pulse" />
      <p className="text-sm md:text-base font-medium tracking-wide text-center">
        Celebrating Our <span className="text-[#BA9FFE] font-bold">1st Anniversary!</span> 🎊 Build your future with WaliyyApp.
      </p>
      {isClosable && (
        <button
          onClick={handleDismiss}
          className="ml-auto text-gray-400 hover:text-white"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default AnniversaryNotice;
