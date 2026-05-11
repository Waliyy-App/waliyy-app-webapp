import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import SidebarComponent from "../sidebar/Sidebar";
import ProfileHeader from "./ProfileHeader";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MeProfile from "./MeProfile";
import EduProfile from "./EduProfile";
import DeenProfile from "./DeenProfile";
import { usePersistedState, a11yProps } from "../../utils.js";
import MobileNav from "../sidebar/MobileBottomNav.js";
import { getMatch, getLikes, getUserById } from "../../services";
import { useAuthContext } from "../../context/AuthContext";
import Loader from "../Loader.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FaLock } from "react-icons/fa";

const ProfileDetails = () => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = usePersistedState("isOpen", false);
  const [child, setChild] = useState({});
  const [showButton, setShowButton] = useState("");
  const { id } = useParams();
  const location = useLocation();
  const childId = localStorage.getItem("childId");
  const { matchID } = location.state || {};
  const navigate = useNavigate();

  const { token } = useAuthContext();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log("id: ", id);

  useEffect(() => {
    const from = location.state?.from;
    if (from === "match") {
      const getMatches = async () => {
        try {
          setLoading(true);
          const res = await getMatch(childId, token);
          setChild(res?.data?.match);
        } catch (err) {
          throw new Error(err);
        } finally {
          setLoading(false);
        }
      };

      getMatches();
    } else if (from === "liked") {
      async function getLikeDetails() {
        setLoading(true);
        try {
          setLoading(true);
          const res = await getLikes(childId, "given", token);
          const match = res?.data?.find((item) => item.receiver.id === id);
          setChild(match.receiver);
          setShowButton("initator");
        } catch (err) {
          throw new Error(err);
        } finally {
          setLoading(false);
        }
      }

      getLikeDetails();
    } else if (from === "likedYou") {
      async function getLikedYouDetails() {
        setLoading(true);
        try {
          const res = await getLikes(childId, "received", token);
          const match = res?.data?.find((item) => item.initiator.id === id);
          setChild(match.initiator);
          setShowButton("receiver");
        } catch (err) {
          throw new Error(err);
        } finally {
          setLoading(false);
        }
      }

      getLikedYouDetails();
    } else {
      async function getChildDetails() {
        setLoading(true);
        try {
          const res = await getUserById(id, token);
          setChild(res?.data);
        } catch (err) {
          throw new Error(err);
        } finally {
          setLoading(false);
        }
      }

      getChildDetails();
    }
  }, [childId, token, id, location.state]);

  const goBack = () => {
    navigate(-1);
  };

  const { activePlan } = useAuthContext();
  const isSubscribed = !!activePlan;

  return (
    <div className="flex flex-col sm:flex-row">
      <SidebarComponent isOpen={isOpen} toggleMenu={toggleMenu} />
      <main
        className={`${
          isOpen ? "ml-0 sm:ml-[100px]" : "ml-0 sm:ml-[280px]"
        } py-[64px] px-8 w-full transition-all duration-300`}
      >
        {loading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <button
              onClick={goBack}
              className="border mb-4 border-[#2D133A] text-[#2D133A] p-2 rounded flex items-center gap-2 "
            >
              <ArrowBackIcon />
              Back
            </button>
            <div className="relative">
              <div className={`${!isSubscribed ? "blur-[16px] pointer-events-none select-none" : ""}`}>
                <ProfileHeader
                  firstName={child?.firstName}
                  age={child?.age}
                  profession={child?.profession}
                  lga={child?.lga}
                  residence={child?.countryofResidence}
                  gender={child?.gender}
                  displayID={child?.displayId}
                  matchID={matchID}
                  showButton={showButton}
                />

                <div>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                      textColor="inherit"
                      indicatorColor="secondary"
                      variant="scrollable"
                      scrollButtons="auto"
                    >
                      <Tab label="Me" {...a11yProps(0)} />
                      <Tab label="My Education and Profession" {...a11yProps(1)} />
                      <Tab label="My Deen" {...a11yProps(2)} />
                    </Tabs>
                  </Box>

                  <MeProfile
                    about={child?.about}
                    dressing={child?.aboutDressing}
                    genotype={child?.genotype}
                    height={child?.height}
                    weight={child?.weight}
                    hasChildren={child?.hasChildren}
                    smoke={child?.isSmoker}
                    drink={child?.isDrinker}
                    state={child?.state}
                    maritalStatus={child?.maritalStatus}
                    nationality={child?.citizenship}
                    mixedEthnicityDescription={child?.mixedEthnicityDescription}
                    isMixedEthnicity={child?.isMixedEthnicity}
                    addictions={child?.hasAddictions}
                    value={value}
                  />

                  <EduProfile
                    eduProf={child?.aboutEducationAndJob}
                    plans={child?.professionalPlans}
                    value={value}
                    educationLevel={child?.educationLevel}
                    employmentStatus={child?.employmentStatus}
                    profession={child?.profession}
                    isWillingToRelocate={child?.isWillingToRelocate}
                    relocationPlans={child?.relocationPlans}
                  />

                  <DeenProfile
                    practiceDesc={child?.descriptionOfIslamicPractice}
                    speakers={child?.speakersListenedTo}
                    revert={child?.isARevert}
                    salatPattern={child?.salatPattern}
                    sect={child?.sect}
                    startedPracticingIn={child?.startedPracticingIn}
                    value={value}
                  />
                </div>
              </div>

              {!isSubscribed && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
                  <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-2xl border border-[#FE8D9F]/30 max-w-lg w-full text-center flex flex-col items-center gap-6 sm:gap-8 transform transition-all scale-100 sm:scale-110">
                    <div className="bg-[#FE8D9F] p-4 sm:p-6 rounded-full text-white shadow-2xl animate-pulse">
                      <FaLock size={32} className="sm:hidden" />
                      <FaLock size={48} className="hidden sm:block" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2D133A] mb-3 sm:mb-4">Waliyy Premium</h2>
                      <p className="text-[#2D133A]/80 text-base sm:text-xl mb-6 sm:mb-10 leading-relaxed px-2">
                         Find your pious spouse today. Subscribe to unlock full profile details and start connecting.
                      </p>
                      <button 
                        onClick={() => navigate('/select-plan')}
                        className="w-full bg-[#2D133A] text-white py-4 sm:py-6 px-6 sm:px-10 rounded-2xl sm:rounded-3xl font-black text-lg sm:text-2xl hover:bg-[#432152] transition-all shadow-[0_15px_40px_rgba(45,19,58,0.2)] hover:shadow-[0_25px_60px_rgba(45,19,58,0.4)] active:scale-95 whitespace-nowrap"
                      >
                        Subscribe to View
                      </button>
                    </div>
                  </div>
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

export default ProfileDetails;
