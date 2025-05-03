import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const BASE_LIMIT = 9;
  const STEP = 6;
  const MAX_LIMIT = 100;

  const [isOpen, setIsOpen] = usePersistedState('isOpen', false);
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const [page, setPage] = useState(
    () => parseInt(sessionStorage.getItem('explorepage')) || 1
  );
  const [limit, setLimit] = useState(
    () => parseInt(sessionStorage.getItem('explorelimit')) || BASE_LIMIT
  );

  const hasRestoredScroll = useRef(false);
  const { token } = useAuthContext();

  const fetchUsers = useCallback(
    async (pageNum, limitNum, isNewPage = false) => {
      setLoading(true);
      try {
        const res = await getAllUsers(token, pageNum, limitNum);
        const data = res?.data?.children || [];

        if (data?.length === 0) {
          setHasMore(false);
          return;
        }

        setProfiles((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newProfiles = data.filter((p) => !existingIds.has(p.id));
          return [...prev, ...newProfiles];
        });
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    fetchUsers(page, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll restore after profiles are rendered
  useEffect(() => {
    const savedScroll = parseInt(sessionStorage.getItem('scrollPos'), 10);
    if (
      !isNaN(savedScroll) &&
      profiles.length > 0 &&
      !hasRestoredScroll.current
    ) {
      hasRestoredScroll.current = true;
      setTimeout(() => {
        window.scrollTo({ top: savedScroll, behavior: 'auto' });
      }, 0);
    }
  }, [profiles]);

  const loadMore = async () => {
    if (!loading && hasMore) {
      if (limit + STEP <= MAX_LIMIT) {
        const newLimit = limit + STEP;
        setLimit(newLimit);
        sessionStorage.setItem('explorelimit', newLimit);
        await fetchUsers(page, newLimit);
      } else {
        const nextPage = page + 1;
        setPage(nextPage);
        setLimit(BASE_LIMIT);
        sessionStorage.setItem('explorepage', nextPage);
        sessionStorage.setItem('explorelimit', String(BASE_LIMIT));
        await fetchUsers(nextPage, BASE_LIMIT, true);
      }
    }
  };

  const loadLess = async () => {
    if (loading || (page === 1 && limit === BASE_LIMIT)) return;

    if (limit > BASE_LIMIT) {
      const newLimit = limit - STEP;
      setLimit(newLimit);
      sessionStorage.setItem('explorelimit', newLimit);

      // Remove extra profiles from the bottom
      setProfiles((prev) => prev.slice(0, prev.length - STEP));
    } else if (page > 1) {
      const previousPage = page - 1;
      setPage(previousPage);
      setLimit(MAX_LIMIT);
      sessionStorage.setItem('explorepage', previousPage);
      sessionStorage.setItem('explorelimit', MAX_LIMIT);

      // Remove current page's profiles
      setProfiles((prev) => prev.slice(0, prev.length - limit));

      await fetchUsers(previousPage, MAX_LIMIT);
    }
  };

  const handleProfileClick = () => {
    sessionStorage.setItem('scrollPos', String(window.scrollY));
    sessionStorage.setItem('page', page);
    sessionStorage.setItem('limit', limit);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hideLoadMoreButton = profiles?.length % 100 !== 0 && page !== 1;

  return (
    <div className="flex flex-col sm:flex-row">
      <SidebarComponent isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
      <main
        className={`${
          isOpen ? 'ml-0 sm:ml-[100px]' : 'ml-0 sm:ml-[280px]'
        } w-full transition-all duration-300 bg-[#d4c4fb1d]`}
      >
        <Navigation />
        {loading && profiles.length === 0 ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-y-8 py-[64px] px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {profiles.map((items) => (
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
            <div className="flex items-center gap-x-4 justify-center">
              {hasMore && !hideLoadMoreButton && (
                <button
                  onClick={loadMore}
                  className="self-center bg-[#BA9FFE] hover:bg-[#a37eff] text-white font-medium px-6 py-3 rounded-lg shadow-md"
                >
                  Load More
                </button>
              )}
              {(profiles.length > BASE_LIMIT || page > 1) && (
                <button
                  onClick={loadLess}
                  className="self-center bg-[#E0D7FF] hover:bg-[#c2b9f5] text-[#2D1E64] font-medium px-6 py-3 rounded-lg shadow-md"
                >
                  Load Less
                </button>
              )}
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

export default Explore;
