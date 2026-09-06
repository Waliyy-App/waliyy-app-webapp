import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import SidebarComponent from "../components/sidebar/Sidebar";
import { usePersistedState, shuffleArray } from "../utils.js";
import MobileNav from "../components/sidebar/MobileBottomNav.js";
import ProfileCard from "../components/ProfileCard.js";
import { useAuthContext } from "../context/AuthContext.js";
import { getRecommedations, verifyPromoPayment } from "../services";
import Loader from "../components/Loader.js";
import Navigation from "../components/sidebar/Navigation.js";
import DashboardPromoBanner from "../components/DashboardPromoBanner.js";
// Icons
import { FaFrown, FaArrowUp, FaSearch, FaTimes, FaFilter } from "react-icons/fa";

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
  // Total count of recommendations
  const [totalCount, setTotalCount] = useState(0);

  // Whether the user has not yet set preferences (so we suggest setting them)
  const [preferencesNotSet, setPreferencesNotSet] = useState(false);

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

  // URL location (used to detect Paystack callback with a transaction reference)
  const location = useLocation();

  // Ref to track if scroll position is already restored
  const restoredRef = useRef(false);

  // Tracks if at least one render cycle has completed
  const [hasRenderedOnce, setHasRenderedOnce] = useState(false);

  /**
   * Fetch all recommendations and initialize local pagination
   */
  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch a large limit to grab all profiles at once
      const res = await getRecommedations(childId, token, 1, 1000);
      const data = res?.data?.recommendations || [];
      const total = res?.data?.totalCount || data.length;

      setTotalCount(total);
      setPreferencesNotSet(res?.data?.preferencesNotSet === true);

      // Check if we have a persisted order for this session
      const savedOrder = sessionStorage.getItem("dashboard_recommendations_order");
      let finalData;

      if (savedOrder) {
        const orderIds = JSON.parse(savedOrder);
        const orderMap = new Map(orderIds.map((id, index) => [id, index]));

        // Sort fetched data based on saved order, new items go to the end
        finalData = [...data].sort((a, b) => {
          const indexA = orderMap.has(a.id) ? orderMap.get(a.id) : Infinity;
          const indexB = orderMap.has(b.id) ? orderMap.get(b.id) : Infinity;
          return indexA - indexB;
        });
      } else {
        // First time loading: shuffle and save the order
        finalData = shuffleArray(data);
        sessionStorage.setItem("dashboard_recommendations_order", JSON.stringify(finalData.map(u => u.id)));
      }

      setAllProfiles(finalData);

      // Calculate total pages for pagination
      const calculatedTotalPages = Math.ceil(total / ITEMS_PER_PAGE);
      setTotalPages(calculatedTotalPages);

      // If the current page is now out of range (e.g. the user changed
      // preferences and the result set shrank), reset to page 1.
      const persistedPage = parseInt(sessionStorage.getItem("dashboardPage")) || 1;
      if (persistedPage > calculatedTotalPages) {
        setCurrentPage(1);
        sessionStorage.setItem("dashboardPage", "1");
      }

    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error fetching recommendations"
      );
    } finally {
      setLoading(false);
      setHasRenderedOnce(true);
    }
  }, [childId, token, ITEMS_PER_PAGE]);

  // Fetch recommendations on component mount
  useEffect(() => {
    fetchRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Verify a returned Paystack promo payment (fallback in case the webhook
  // is delayed or cannot reach the server) and activate the subscription.
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const reference = searchParams.get("reference") || searchParams.get("trxref");
    if (!reference || !token) return;

    let cancelled = false;
    let shouldReload = false;

    const cleanUrl = () => {
      const url = new URL(window.location.href);
      url.searchParams.delete("reference");
      url.searchParams.delete("trxref");
      window.history.replaceState({}, "", url.toString());
    };

    verifyPromoPayment(reference, token)
      .then((res) => {
        if (cancelled) return;
        if (res?.data?.activated || res?.data?.alreadyActive) {
          shouldReload = true;
          cleanUrl();
          toast.success("Payment confirmed! Your account is now active.");
        }
      })
      .catch(() => {
        if (cancelled) return;
        toast.error("Payment could not be verified. Your account may still be activated shortly.");
      })
      .finally(() => {
        if (cancelled) return;
        if (shouldReload) {
          window.location.reload();
        } else {
          cleanUrl();
        }
      });

    return () => {
      cancelled = true;
    };
  }, [location.search, token]);

  // Handle search streaming & pagination
  useEffect(() => {
    if (searchTerm.trim() === "") {
      // Show current paginated results when search is empty
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const currentSlice = allProfiles.slice(startIndex, endIndex);

      setProfiles(currentSlice);
      setFilteredProfiles(currentSlice);
    } else {
      // Filter all profiles by displayId
      const filtered = allProfiles.filter(
        (profile) =>
          profile.displayId &&
          profile.displayId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProfiles(filtered);
    }
  }, [searchTerm, allProfiles, currentPage, ITEMS_PER_PAGE]);

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
    sessionStorage.setItem("dashboardPage", String(newPage));

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
        className={`${isOpen ? "ml-0 sm:ml-[100px]" : "ml-0 sm:ml-[280px]"
          } w-full transition-all duration-300 bg-[#d4c4fb1d] min-h-screen`}
      >
        <Navigation />

        <DashboardPromoBanner />

        {/* Set preferences prompt banner */}
        {preferencesNotSet && !loading && (
          <div className="mx-4 sm:mx-8 my-3 rounded-xl bg-[#BA9FFE]/15 border border-[#BA9FFE]/60 text-[#2D133A] px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-lg bg-[#2D133A] text-[#BA9FFE] flex items-center justify-center flex-shrink-0">
                <FaFilter />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm sm:text-base">
                  Set your preferences to filter profiles to your taste
                </p>
                <p className="text-xs sm:text-sm text-[#665e6b] mt-0.5">
                  You're currently seeing general recommendations. Set your criteria for more tailored matches.
                </p>
              </div>
            </div>
            <Link
              to="/filter"
              className="flex-shrink-0 self-start sm:self-auto px-4 py-2 bg-[#2D133A] hover:bg-[#4A2A63] text-white text-sm font-bold rounded-lg shadow transition-colors"
            >
              Set Preferences
            </Link>
          </div>
        )}

        {/* Loader when no profiles yet */}
        {loading && profiles?.length === 0 ? (
          <Loader />
        ) : (
          <div className="px-4 sm:px-8 py-[64px] flex flex-col gap-y-8">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaSearch className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search by User ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#BA9FFE] focus:border-transparent outline-none transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <FaTimes className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                  </button>
                )}
              </div>

            </div>

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
                    //isSubscribed={item?.isSubscribed}
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
                      className={`px-3 py-2 rounded-lg border transition-colors ${page === currentPage
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
