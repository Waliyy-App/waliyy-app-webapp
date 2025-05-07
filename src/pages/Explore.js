import React, { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import SidebarComponent from "../components/sidebar/Sidebar";
import { usePersistedState } from "../utils.js";
import MobileNav from "../components/sidebar/MobileBottomNav.js";
import ProfileCard from "../components/ProfileCard.js";
import { useAuthContext } from "../context/AuthContext.js";
import { getAllUsers } from "../services";
import Loader from "../components/Loader.js";
import Navigation from "../components/sidebar/Navigation.js";

const Explore = () => {
  const BASE_LIMIT = 9;
  const STEP = 6;
  const MAX_LIMIT = 100;

  const [isOpen, setIsOpen] = usePersistedState("isOpen", false);
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const [page, setPage] = useState(
    () => parseInt(sessionStorage.getItem("explorepage")) || 1
  );
  const [limit, setLimit] = useState(
    () => parseInt(sessionStorage.getItem("explorelimit")) || BASE_LIMIT
  );

  const hasRestoredScroll = useRef(false);
  const { token } = useAuthContext();

  const fetchUsers = useCallback(
    async (pageNum, limitNum, isNewPage = false) => {
      setLoading(true);
      try {
        const res = await getAllUsers(token, pageNum, limitNum);
        setTotalCount(res?.data?.totalCount);
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
        toast.error(error?.response?.data?.message || "Failed to load users");
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
    const savedScroll = parseInt(sessionStorage.getItem("scrollPos"), 10);
    if (
      !isNaN(savedScroll) &&
      profiles.length > 0 &&
      !hasRestoredScroll.current
    ) {
      hasRestoredScroll.current = true;
      setTimeout(() => {
        window.scrollTo({ top: savedScroll, behavior: "auto" });
      }, 0);
    }
  }, [profiles]);

  const loadMore = async () => {
    if (!loading && hasMore) {
      if (limit + STEP <= MAX_LIMIT) {
        const newLimit = limit + STEP;
        setLimit(newLimit);
        sessionStorage.setItem("explorelimit", newLimit);
        await fetchUsers(page, newLimit);
      } else {
        const nextPage = page + 1;
        setPage(nextPage);
        setLimit(BASE_LIMIT);
        sessionStorage.setItem("explorepage", nextPage);
        sessionStorage.setItem("explorelimit", String(BASE_LIMIT));
        await fetchUsers(nextPage, BASE_LIMIT, true);
      }
    }
  };

  const loadLess = async () => {
    if (loading || (page === 1 && limit === BASE_LIMIT)) return;

    if (limit > BASE_LIMIT) {
      const newLimit = limit - STEP;
      setLimit(newLimit);
      sessionStorage.setItem("explorelimit", newLimit);

      // Remove extra profiles from the bottom
      setProfiles((prev) => prev.slice(0, prev.length - STEP));
    } else if (page > 1) {
      const previousPage = page - 1;
      setPage(previousPage);
      setLimit(MAX_LIMIT);
      sessionStorage.setItem("explorepage", previousPage);
      sessionStorage.setItem("explorelimit", MAX_LIMIT);

      // Remove current page's profiles
      setProfiles((prev) => prev.slice(0, prev.length - limit));

      await fetchUsers(previousPage, MAX_LIMIT);
    }
  };

  const handleProfileClick = () => {
    sessionStorage.setItem("scrollPos", String(window.scrollY));
    sessionStorage.setItem("page", page);
    sessionStorage.setItem("limit", limit);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hideLoadMoreButton = profiles.length >= totalCount;

  return (
    <div className="flex flex-col sm:flex-row">
      <SidebarComponent isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
      <main
        className={`${
          isOpen ? "ml-0 sm:ml-[100px]" : "ml-0 sm:ml-[280px]"
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
                  disabled={loading}
                  className="self-center flex items-center gap-x-2.5 bg-[#BA9FFE] hover:bg-[#a37eff] text-white font-medium px-6 py-3 rounded-lg shadow-md"
                >
                  {loading ? (
                    <>
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-200"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span>Loading...</span>
                    </>
                  ) : (
                    "Load More"
                  )}
                </button>
              )}
              {(profiles?.length > BASE_LIMIT || page > 1) && (
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
