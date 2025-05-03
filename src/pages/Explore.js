import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import SidebarComponent from '../components/sidebar/Sidebar';
import { usePersistedState } from '../utils.js';
import MobileNav from '../components/sidebar/MobileBottomNav.js';
import ProfileCard from '../components/ProfileCard.js';
import { useAuthContext } from '../context/AuthContext.js';
import { getAllUsers } from '../services';
import Loader from '../components/Loader.js';
import Navigation from '../components/sidebar/Navigation.js';

const Explore = () => {
  const PAGE_SIZE = 9;

  const [isOpen, setIsOpen] = usePersistedState('isOpen', false);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [visibleProfiles, setVisibleProfiles] = useState([]);

  const [visibleCount, setVisibleCount] = useState(() => {
    return parseInt(sessionStorage.getItem('visibleCount')) || PAGE_SIZE;
  });

  const { token } = useAuthContext();
  const hasRestoredScroll = useRef(false);

  useEffect(() => {
    const getSuitors = async () => {
      setLoading(true);
      try {
        const res = await getAllUsers(token, 1);
        const data = res?.data?.children || [];
        setRecommendations(data);
        setVisibleProfiles(data.slice(0, visibleCount));
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    getSuitors();
  }, [token, visibleCount]);

  // Restore scroll position after profiles render — only once
  useEffect(() => {
    const savedScrollPos = parseInt(sessionStorage.getItem('scrollPos'), 10);
    if (!isNaN(savedScrollPos) && visibleProfiles.length > 0 && !hasRestoredScroll.current) {
      hasRestoredScroll.current = true;
      setTimeout(() => {
        window.scrollTo({ top: savedScrollPos, behavior: 'auto' });
      }, 0);
    }
  }, [visibleProfiles]);

  const loadMore = () => {
    const newCount = visibleCount + PAGE_SIZE;
    setVisibleCount(newCount);
    sessionStorage.setItem('visibleCount', newCount);
    setVisibleProfiles(recommendations.slice(0, newCount));
  };

  const handleProfileClick = () => {
    sessionStorage.setItem('scrollPos', String(window.scrollY));
    sessionStorage.setItem('visibleCount', String(visibleCount));
    sessionStorage.removeItem('restoredScroll'); // optional cleanup
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
      <div className="flex flex-col sm:flex-row">
        <SidebarComponent isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
        <main
            className={`${
                isOpen ? 'ml-0 sm:ml-[100px]' : 'ml-0 sm:ml-[280px]'
            } w-full transition-all duration-300 bg-[#d4c4fb1d]`}
        >
          <Navigation />
          {loading ? (
              <Loader />
          ) : (
              <div className="flex flex-col gap-y-8 py-[64px] px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {visibleProfiles.map((items) => (
                      <ProfileCard
                          key={items.id}
                          id={items.id}
                          age={items.age}
                          lga={items.lga}
                          firstName={items.firstName}
                          residence={items.countryofResidence}
                          about={items.about}
                          profession={items.profession}
                          gender={items.gender}
                          displayID={items?.displayId}
                          href={`/explore/${items.id}`}
                          onClick={handleProfileClick}
                      />
                  ))}
                </div>
                {visibleCount < recommendations.length && (
                    <button
                        onClick={loadMore}
                        className="self-center bg-[#BA9FFE] hover:bg-[#a37eff] text-white font-medium px-6 py-3 rounded-lg shadow-md"
                    >
                      Load More
                    </button>
                )}
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-[#BA9FFE] hover:bg-[#a37eff] text-white px-4 py-2 rounded-full shadow-md"
                >
                  ↑ Top
                </button>
              </div>
          )}
        </main>
        <MobileNav />
      </div>
  );
};

export default Explore;
