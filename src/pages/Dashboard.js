import React, { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import SidebarComponent from "../components/sidebar/Sidebar";
import { usePersistedState } from "../utils.js";
import MobileNav from "../components/sidebar/MobileBottomNav.js";
import ProfileCard from "../components/ProfileCard.js";
import { useAuthContext } from "../context/AuthContext.js";
import { getRecommedations } from "../services";
import Loader from "../components/Loader.js";
import Navigation from "../components/sidebar/Navigation.js";
// Icons
import { FaFrown, FaArrowUp } from "react-icons/fa";

const Dashboard = () => {
  // Pagination configuration
  const ITEMS_PER_PAGE = 40;
  const MAX_VISIBLE_PAGES = 3;

  // Sidebar state (persisted in localStorage/sessionStorage)
  const [isOpen, setIsOpen] = usePersistedState("isOpen", false);

  // Loading indicator
  const [loading, setLoading] = useState(false);

  // Profile data states
  const [profiles, setProfiles] = useState([]);         // Paginated profiles
  const [allProfiles, setAllProfiles] = useState([]);   // All profiles (used for searching)
  const [filteredProfiles, setFilteredProfiles] = useState([]); // Filtered results (search/pagination)
console.log(filteredProfiles)
  // Total count of recommendations
  const [totalCount, setTotalCount] = useState(0);

  // Search term input
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(
    () => parseInt(sessionStorage.getItem("dashboardPage")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);

  // Auth context (for API authentication)
  const { token } = useAuthContext();

  // Child ID for API request
  const childId = localStorage?.getItem("childId");

  // Ref to track if scroll position is already restored
  const restoredRef = useRef(false);

  // Tracks if at least one render cycle has completed
  const [hasRenderedOnce, setHasRenderedOnce] = useState(false);

  /**
   * Fetches *all* recommendations (mainly for searching purposes)
   */
  const fetchAllRecommendations = useCallback(async () => {
    try {
      const res = await getRecommedations(
        childId,
        token,
        1,
        totalCount || 1000 // Get all available profiles
      );
      const data = res?.data?.recommendations || [];
      setAllProfiles(data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error fetching all recommendations"
      );
    }
  }, [childId, token, totalCount]);

  /**
   * Fetch paginated recommendations for the current page
   */
  const fetchRecommendations = useCallback(
    async (page) => {
      setLoading(true);
      try {
        const res = await getRecommedations(childId, token, page, ITEMS_PER_PAGE);
        const data = res?.data?.recommendations || [];
        const total = res?.data?.totalCount || 0;

        setTotalCount(total);

        // Calculate total pages for pagination
        const calculatedTotalPages = Math.ceil(total / ITEMS_PER_PAGE);
        setTotalPages(calculatedTotalPages);

        // Avoid duplicate profiles by checking IDs
        setProfiles((prev) => {
          const existingIds = new Set(prev?.map((p) => p?.id));
          const newProfiles = data?.filter((p) => !existingIds?.has(p.id));
          return [...prev, ...newProfiles];
        });

        // For displaying in the grid (current page only)
        setFilteredProfiles(data);

        // Save the current page in session storage
        sessionStorage.setItem("dashboardPage", page);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Error fetching recommendations"
        );
      } finally {
        setLoading(false);
        setHasRenderedOnce(true);
      }
    },
    [childId, token, ITEMS_PER_PAGE]
  );

  // Fetch recommendations on component mount
  useEffect(() => {
    fetchRecommendations(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch all recommendations once totalCount is known
  useEffect(() => {
    if (totalCount > 0) {
      fetchAllRecommendations();
    }
  }, [totalCount, fetchAllRecommendations]);

  // Handle search filtering
  useEffect(() => {
    if (searchTerm.trim() === "") {
      // Show current paginated results when search is empty
      setFilteredProfiles(profiles);
    } else {
      // Filter all profiles by displayId
      const filtered = allProfiles.filter(
        (profile) =>
          profile.displayId &&
          profile.displayId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProfiles(filtered);
    }
  }, [searchTerm, profiles, allProfiles]);

  // Restore scroll position when navigating back to this page
  useEffect(() => {
    const savedPos = parseInt(sessionStorage?.getItem("scrollPos"), 10);
    if (
      !isNaN(savedPos) &&
      profiles?.length > 0 &&
      hasRenderedOnce &&
      !restoredRef?.current
    ) {
      restoredRef.current = true;
      setTimeout(() => {
        window.scrollTo({ top: savedPos, behavior: "auto" });
      }, 0);
    }
  }, [profiles, hasRenderedOnce]);

  /**
   * Handle changing the current page (pagination)
   */
  const handlePageChange = async (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;

    // Save current scroll position before navigating
    sessionStorage.setItem("scrollPos", String(window.scrollY));

    setCurrentPage(newPage);
    await fetchRecommendations(newPage);

    // Scroll to top for better user experience
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   * Save scroll position when profile card is clicked
   */
  const handleProfileClick = () => {
    sessionStorage.setItem("scrollPos", String(window.scrollY));
    sessionStorage.setItem("page", currentPage);
  };

  /**
   * Scroll back to top button
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   * Toggle sidebar menu
   */
  const toggleMenu = () => setIsOpen(!isOpen);

  /**
   * Generate visible pagination numbers (with "..." where needed)
   */
  const getPageNumbers = () => {
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);

    // Adjust range if near the end
    if (end - start + 1 < MAX_VISIBLE_PAGES) {
      start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row">
      {/* Sidebar */}
      <SidebarComponent isOpen={isOpen} toggleMenu={toggleMenu} />

      <main
        className={`${
          isOpen ? "ml-0 sm:ml-[100px]" : "ml-0 sm:ml-[280px]"
        } w-full transition-all duration-300 bg-[#d4c4fb1d] min-h-screen`}
      >
        <Navigation />

        {/* Loader when no profiles yet */}
        {loading && profiles?.length === 0 ? (
          <Loader />
        ) : (
          <div className="px-4 sm:px-8 py-[64px] flex flex-col gap-y-8">
            {/* Results Count */}
            <div className="text-center">
              {searchTerm ? (
                <p className="text-gray-600">
                  Found {filteredProfiles.length} user
                  {filteredProfiles.length !== 1 ? "s" : ""} matching "
                  {searchTerm}"
                </p>
              ) : (
                <p className="text-gray-600">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                  {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of{" "}
                  {totalCount} recommendations
                </p>
              )}
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfiles.length > 0 ? (
                filteredProfiles.map((item) => (
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
                    isSubscribed={item?.isSubscribed}
                    onClick={handleProfileClick}
                  />
                ))
              ) : searchTerm ? (
                // No results message when searching
                <div className="col-span-full text-center py-12">
                  <FaFrown className="w-16 h-16 mx-auto text-gray-400" />
                  <p className="mt-4 text-gray-600 text-lg">
                    No recommendations found with this ID
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="mt-4 text-[#BA9FFE] hover:text-[#a37eff] font-medium"
                  >
                    Clear search
                  </button>
                </div>
              ) : null}
            </div>

            {/* Pagination Controls (only show when not searching) */}
            {!searchTerm && totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  {/* First Page + Dots */}
                  {currentPage > Math.floor(MAX_VISIBLE_PAGES / 2) + 1 && (
                    <>
                      <button
                        onClick={() => handlePageChange(1)}
                        className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors hidden sm:block"
                      >
                        1
                      </button>
                      {currentPage > Math.floor(MAX_VISIBLE_PAGES / 2) + 2 && (
                        <span className="px-1">...</span>
                      )}
                    </>
                  )}

                  {/* Page Numbers */}
                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-lg border transition-colors ${
                        page === currentPage
                          ? "border-[#BA9FFE] bg-[#BA9FFE] text-white"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Last Page + Dots */}
                  {currentPage < totalPages - Math.floor(MAX_VISIBLE_PAGES / 2) && (
                    <>
                      {currentPage < totalPages - Math.floor(MAX_VISIBLE_PAGES / 2) - 1 && (
                        <span className="px-1">...</span>
                      )}
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors hidden sm:block"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 bg-[#BA9FFE] hover:bg-[#a37eff] text-white w-12 h-12 flex items-center justify-center rounded-full shadow-md transition-transform hover:scale-105 z-10"
              aria-label="Scroll to top"
            >
              <FaArrowUp />
            </button>
          </div>
        )}
      </main>

      {/* Mobile Bottom Nav */}
      <MobileNav />
    </div>
  );
};

export default Dashboard;
