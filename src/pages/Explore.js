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

// Import React Icons
import { FaSearch, FaTimes, FaFrown, FaArrowUp } from "react-icons/fa";

const Explore = () => {
  const ITEMS_PER_PAGE = 15;
  const MAX_VISIBLE_PAGES = 5;

  const [isOpen, setIsOpen] = usePersistedState("isOpen", false);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]); // Store all profiles for search
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(
    () => parseInt(sessionStorage.getItem("explorePage")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);

  const hasRestoredScroll = useRef(false);
  const { token } = useAuthContext();

  // Fetch all users for searching
  const fetchAllUsers = useCallback(async () => {
    setSearchLoading(true);
    try {
      const res = await getAllUsers(token, 1, totalCount || 1000); // Use a large limit to get all users
      const data = res?.data?.children || [];
      setAllProfiles(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load users for search");
    } finally {
      setSearchLoading(false);
    }
  }, [token, totalCount]);

  // Fetch users for pagination
  const fetchUsers = useCallback(
    async (page) => {
      setLoading(true);
      try {
        const res = await getAllUsers(token, page, ITEMS_PER_PAGE);
        setTotalCount(res?.data?.totalCount);
        const data = res?.data?.children || [];
        
        // Calculate total pages
        const calculatedTotalPages = Math.ceil(res?.data?.totalCount / ITEMS_PER_PAGE);
        setTotalPages(calculatedTotalPages);
        
        setProfiles(data);
        setFilteredProfiles(data);
        
        // Save current page to session storage
        sessionStorage.setItem("explorePage", page);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    fetchUsers(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch all users when totalCount is available
  useEffect(() => {
    if (totalCount > 0) {
      fetchAllUsers();
    }
  }, [totalCount, fetchAllUsers]);

  // Filter profiles based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      // If no search term, show paginated results
      setFilteredProfiles(profiles);
    } else {
      // If search term exists, filter through all profiles
      const filtered = allProfiles.filter(profile => 
        profile.displayId && profile.displayId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProfiles(filtered);
    }
  }, [searchTerm, profiles, allProfiles]);

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

  const handlePageChange = async (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    
    // Save scroll position before changing page
    sessionStorage.setItem("scrollPos", String(window.scrollY));
    
    setCurrentPage(newPage);
    await fetchUsers(newPage);
    
    // Scroll to top after page change for better UX
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProfileClick = () => {
    sessionStorage.setItem("scrollPos", String(window.scrollY));
    sessionStorage.setItem("page", currentPage);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);
    
    // Adjust if we're near the end
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
          <div className="flex flex-col gap-y-8 py-[64px] px-4 sm:px-8">
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
              {(searchLoading) && (
                <div className="absolute inset-x-0 bottom-0 flex justify-center">
                  <div className="w-6 h-6 border-t-2 border-r-2 border-[#BA9FFE] rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="text-center">
              {searchTerm ? (
                <p className="text-gray-600">
                  Found {filteredProfiles.length} user{filteredProfiles.length !== 1 ? 's' : ''} matching "{searchTerm}"
                </p>
              ) : (
                <p className="text-gray-600">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                  {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of{" "}
                  {totalCount} users
                </p>
              )}
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfiles.length > 0 ? (
                filteredProfiles.map((items) => (
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
                ))
              ) : searchTerm ? (
                <div className="col-span-full text-center py-12">
                  <FaFrown className="w-16 h-16 mx-auto text-gray-400" />
                  <p className="mt-4 text-gray-600 text-lg">No users found with this ID</p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="mt-4 text-[#BA9FFE] hover:text-[#a37eff] font-medium"
                  >
                    Clear search
                  </button>
                </div>
              ) : null}
            </div>

            {/* Pagination Controls - Only show if not searching */}
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
                  
                  {/* First Page */}
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
                  
                  {/* Last Page */}
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
      <MobileNav />
    </div>
  );
};

export default Explore;