import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import SidebarComponent from '../components/sidebar/Sidebar';
import { usePersistedState } from '../utils.js';
import MobileNav from '../components/sidebar/MobileBottomNav.js';
import ProfileCard from '../components/ProfileCard.js';
import { useAuthContext } from '../context/AuthContext.js';
import { getRecommedations } from '../services';
import Loader from '../components/Loader.js';
import Navigation from '../components/sidebar/Navigation.js';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const Dashboard = () => {
  const BASE_LIMIT = 9;
  const STEP = 6;
  const MAX_LIMIT = 100;

  const [isOpen, setIsOpen] = usePersistedState('isOpen', false);
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { token } = useAuthContext();
  const childId = localStorage.getItem('childId');

  const restoredRef = useRef(false);

  const fetchRecommendations = useCallback(async (pageNumber, currentLimit) => {
    setLoading(true);
    try {
      const res = await getRecommedations(childId, token, pageNumber, currentLimit);
      const data = res?.data?.recommendations || [];

      if (data?.length === 0) {
        setHasMore(false);
        return;
      }

      setProfiles((prev) => {
        const existingIds = new Set(prev?.map((p) => p.id));
        const newProfiles = data?.filter((p) => !existingIds?.has(p.id));
        return [...prev, ...newProfiles];
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error fetching recommendations');
    } finally {
      setLoading(false);
    }
  }, [childId, token]);

  useEffect(() => {
    fetchRecommendations(1, BASE_LIMIT);
  }, [fetchRecommendations]);

  useInfiniteScroll(fetchRecommendations, BASE_LIMIT, loading, hasMore, MAX_LIMIT, STEP);

  // Scroll restore
  useEffect(() => {
    const savedPos = parseInt(sessionStorage.getItem('scrollPos'), 10);
    if (!isNaN(savedPos) && profiles.length > 0 && !restoredRef.current) {
      restoredRef.current = true;
      setTimeout(() => {
        window.scrollTo({ top: savedPos, behavior: 'auto' });
      }, 0);
    }
  }, [profiles]);

  const handleProfileClick = () => {
    sessionStorage.setItem('scrollPos', String(window.scrollY));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
      <div className="flex flex-col sm:flex-row">
        <SidebarComponent isOpen={isOpen} toggleMenu={toggleMenu} />
        <main
            className={`${
                isOpen ? 'ml-0 sm:ml-[100px]' : 'ml-0 sm:ml-[280px]'
            } w-full transition-all duration-300 bg-[#d4c4fb1d] min-h-screen`}
        >
          <Navigation />
          {loading && profiles.length === 0 ? (
              <Loader />
          ) : (
              <div className="px-8 py-[64px] flex flex-col gap-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {profiles.map((item) => (
                      <ProfileCard
                          state="dashboard"
                          key={item.id}
                          id={item.id}
                          age={item.age}
                          lga={item.lga}
                          firstName={item.firstName}
                          residence={item.countryofResidence}
                          about={item.about}
                          profession={item.profession}
                          gender={item.gender}
                          displayID={item?.displayId}
                          onClick={handleProfileClick}
                      />
                  ))}
                </div>
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

export default Dashboard;
