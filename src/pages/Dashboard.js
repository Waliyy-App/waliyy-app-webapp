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
  const PAGE_NUMBER = 12;

  const [isOpen, setIsOpen] = usePersistedState('isOpen', false);
  // const [child, setChild] = useState({});
  const [loading, setLoading] = useState(false);
  const [recommedations, setRecommendations] = useState([]);
  const [currRecommendations, setCurrRecommendations] = useState([]);
  const [endPage, setEndPage] = useState(PAGE_NUMBER);
  const [pageStart, setPageStart] = useState(0);
  const { token } = useAuthContext();
  const childId = localStorage.getItem('childId');

  const usersLength = recommedations?.length;

  // useEffect(() => {
  //   async function getChildDetails() {
  //     setLoading(true);
  //     try {
  //       const res = await getChild(childId, token);
  //       setChild(res?.data);
  //     } catch (err) {
  //       throw new Error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   getChildDetails();
  // }, [childId, token]);

  useEffect(() => {
    const getSuitors = async () => {
      setLoading(true);
      try {
        const res = await getRecommedations(childId, token);
        setRecommendations(res?.data);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    getSuitors();
  }, [token, childId]);

  useEffect(() => {
    setCurrRecommendations(() => {
      const curr = recommedations?.slice(pageStart, endPage);
      return curr;
    });
  }, [recommedations, pageStart, endPage]);

  function handlePrev() {
    if (pageStart === 0) return;
    setPageStart((prev) => prev - PAGE_NUMBER);
    setEndPage((prev) => prev - PAGE_NUMBER);
    window.scrollTo(0, 0);
  }

  function handleNext() {
    if (endPage < usersLength) {
      setPageStart((prev) => prev + PAGE_NUMBER);
      setEndPage((prev) => prev + PAGE_NUMBER);
      window.scrollTo(0, 0);
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <SidebarComponent isOpen={isOpen} toggleMenu={toggleMenu} />

      <main
        className={`${
          isOpen ? 'ml-0 sm:ml-[100px]' : 'ml-0 sm:ml-[280px]'
        }  w-full transition-all duration-300 bg-[#d4c4fb1d] min-h-screen`}
      >
        <Navigation />
        {loading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <div className="px-8 py-[64px] flex flex-col gap-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {currRecommendations?.map((items) => (
                  <ProfileCard
                    state="dashboard"
                    key={items.id}
                    id={items.id}
                    age={items.age}
                    lga={items.lga}
                    firstName={items.firstName}
                    displayID={items?.displayId}
                    residence={items.countryofResidence}
                    about={items.about}
                    profession={items.profession}
                    gender={items.gender}
                  />
                ))}
              </div>
              {currRecommendations?.length > 0 && (
                <div className="self-end flex items-center gap-x-4">
                  <button
                    onClick={handlePrev}
                    disabled={pageStart === 0}
                    className="hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style px-5 flex items-center gap-2"
                  >
                    Prev
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={usersLength === endPage}
                    className="hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style px-5 flex items-center gap-2"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </React.Fragment>
        )}
      </main>
      <MobileNav />
    </div>
  );
};

export default Dashboard;
