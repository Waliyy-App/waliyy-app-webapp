import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import SidebarComponent from '../components/sidebar/Sidebar';
import { usePersistedState } from '../utils.js';
import MobileNav from '../components/sidebar/MobileBottomNav.js';
import ProfileCard from '../components/ProfileCard.js';
import { useAuthContext } from '../context/AuthContext.js';
import { getRecommedations } from '../services/index.js';
import Loader from '../components/Loader.js';
import Navigation from '../components/sidebar/Navigation.js';

const Dashboard = () => {
  const PAGE_SIZE = 9;
  const [isOpen, setIsOpen] = usePersistedState('isOpen', false);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [visibleProfiles, setVisibleProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const { token } = useAuthContext();
  const childId = localStorage.getItem('childId');

  // Initial fetch
  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const res = await getRecommedations(childId, token);
        const data = res?.data || [];
        setRecommendations(data);
        setVisibleProfiles(data.slice(0, PAGE_SIZE));
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [token, childId]);

  // Load more profiles (next page of PAGE_SIZE)
  const loadMoreProfiles = useCallback(() => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const more = recommendations.slice(start, end);
    if (more.length > 0) {
      setVisibleProfiles((prev) => [...prev, ...more]);
      setPage(nextPage);
    }
  }, [page, recommendations]);

  // Handle scroll for infinite loading
  const handleScroll = useCallback(() => {
    if (loading) return;
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    if (scrollTop + windowHeight >= fullHeight - 100) {
      loadMoreProfiles();
    }
  }, [loading, loadMoreProfiles]);

  // Attach scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Save scroll position when clicking a profile
  const handleProfileClick = () => {
    sessionStorage.setItem('scrollPos', window.scrollY);
  };

  // Restore scroll position after profiles render
  useEffect(() => {
    const savedPos = parseInt(sessionStorage.getItem('scrollPos'), 10);
    if (!isNaN(savedPos) && visibleProfiles.length > 0) {
      setTimeout(() => {
        window.scrollTo({ top: savedPos, behavior: 'auto' });
      }, 0);
    }
  }, [visibleProfiles]);

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
        {loading && page === 1 ? (
          <Loader />
        ) : (
          <div className="px-8 py-[64px] flex flex-col gap-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {visibleProfiles.map((item) => (
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
