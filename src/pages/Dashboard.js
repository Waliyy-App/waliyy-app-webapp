import React, { useState, useEffect } from 'react';
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
  const [loadedCount, setLoadedCount] = useState(() => {
    return parseInt(sessionStorage.getItem('visibleCount')) || PAGE_SIZE;
  });
  const { token } = useAuthContext();
  const childId = localStorage.getItem('childId');

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const res = await getRecommedations(childId, token);
        setRecommendations(res?.data || []);
        setVisibleProfiles(res?.data?.slice(0, PAGE_SIZE) || []);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [token, childId]);

  const handleLoadMore = () => {
    const nextBatch = recommendations.slice(0, loadedCount + PAGE_SIZE);
    setVisibleProfiles(nextBatch);
    setLoadedCount(nextBatch.length);
  };

  // Restore scroll position after profiles have rendered
  useEffect(() => {
    const savedScrollPos = parseInt(sessionStorage.getItem('scrollPos'));
    if (savedScrollPos && visibleProfiles.length > 0) {
      setTimeout(() => {
        window.scrollTo({ top: savedScrollPos, behavior: 'instant' });
      }, 0);
    }
  }, [visibleProfiles]);

  const handleProfileClick = () => {
    sessionStorage.setItem('scrollPos', window.scrollY);
    sessionStorage.setItem('loadedCount', loadedCount);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <SidebarComponent isOpen={isOpen} toggleMenu={toggleMenu} />
      <main
        className={`${
          isOpen ? 'ml-0 sm:ml-[100px]' : 'ml-0 sm:ml-[280px]'
        } w-full transition-all duration-300 bg-[#d4c4fb1d] min-h-screen`}
      >
        <Navigation />
        {loading ? (
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
                  displayID={item?.displayId}
                  residence={item.countryofResidence}
                  about={item.about}
                  profession={item.profession}
                  gender={item.gender}
                  onClick={handleProfileClick}
                />
              ))}
            </div>

            {loadedCount < recommendations.length && (
              <div className="self-center">
                <button
                  onClick={handleLoadMore}
                  className="hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style px-5 flex items-center gap-2"
                >
                  Load More
                </button>
              </div>
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

export default Dashboard;
