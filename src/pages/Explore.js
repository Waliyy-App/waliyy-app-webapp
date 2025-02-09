import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SidebarComponent from '../components/sidebar/Sidebar';
import { usePersistedState } from '../utils.js';
import MobileNav from '../components/sidebar/MobileBottomNav.js';
import ProfileCard from '../components/ProfileCard.js';
import { useAuthContext } from '../context/AuthContext.js';
import { getAllUsers } from '../services/index.js';
import Loader from '../components/Loader.js';
import Navigation from '../components/sidebar/Navigation.js';

const Explore = () => {
  const PAGE_SIZE = 9;

  const [isOpen, setIsOpen] = usePersistedState('isOpen', false);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [visibleProfiles, setVisibleProfiles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { token } = useAuthContext();

  useEffect(() => {
    const getSuitors = async () => {
      setLoading(true);
      try {
        const res = await getAllUsers(token);
        setRecommendations(res?.data);
        setVisibleProfiles(res?.data.slice(0, PAGE_SIZE)); // Load first 9
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    getSuitors();
  }, [token]);

  const loadMore = () => {
    const newCount = visibleCount + PAGE_SIZE;
    setVisibleProfiles(recommendations.slice(0, newCount));
    setVisibleCount(newCount);
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
          </div>
        )}
      </main>
      <MobileNav />
    </div>
  );
};

export default Explore;
