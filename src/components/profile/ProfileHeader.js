import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { BsFillDiamondFill } from "react-icons/bs";
import ThumbUpIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDownAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import MaleIcon from "../../assets/illustrations/male-illus.svg";
import FemaleIcon from "../../assets/illustrations/female-illus.svg";
import {
  likeProfile,
  unlikeProfile,
  getCurrentPlan,
  cancelMatch,
  getMatch,
  reactToLike,
} from "../../services";
import { useAuthContext } from "../../context/AuthContext";

const ProfileHeader = ({
  firstName,
  age,
  profession,
  residence,
  gender,
  lga,
  displayID,
  matchID,
  showButton,
  isGeneral = false,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [activePlan, setActivePlan] = useState(null);
  const [isMatchPage, setIsMatchPage] = useState(null);
  const [isDashboard, setIsDashboard] = useState(null);
  const [matchDetails, setMatchDetails] = useState(null);
  const [isLiked, setIsLiked] = useState(false); // State to track if profile is liked
  const { token } = useAuthContext();
  const childId = localStorage.getItem("childId");
  const { id } = useParams();
  const isChild = Boolean(childId === id);
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve isLiked from localStorage when the component mounts
  useEffect(() => {
    const likedStatus = localStorage.getItem(`liked_${id}`);
    if (likedStatus) {
      setIsLiked(JSON.parse(likedStatus));
    }
  }, [id]);

  useEffect(() => {
    if (location?.state?.from === "match") setIsMatchPage(true);
    else if (location?.state?.from === "dashboard") setIsDashboard(true);
  }, [location.state]);

  useEffect(() => {
    const getMatches = async () => {
      try {
        const res = await getMatch(childId, token);
        setMatchDetails(res?.data);
      } catch (err) {
        console.error(err);
      }
    };
    getMatches();
  }, [token, childId, id]);

  useEffect(() => {
    const getActivePlan = async () => {
      try {
        const res = await getCurrentPlan(token);
        setActivePlan(res?.data);
      } catch (err) {
        console.error(err);
      }
    };
    getActivePlan();
  }, [token]);

  const handleLike = async () => {
    if (!activePlan) {
      toast.warning("No current plan. Upgrade to like suitors");
      navigate("/pricing");
      return;
    }
    try {
      setIsDisabled(true);
      const res = await likeProfile(childId, { profile: id }, token);
      toast.success(res?.data?.message);
      setIsLiked(true);
      navigate("/likes");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    // finally {
    //   window.location.reload();
    // }
  };

  const handleAcceptLike = async () => {
    if (!activePlan) {
      toast.warning("No current plan. Upgrade to like suitors");
      navigate("/pricing");
      return;
    }
    try {
      setIsDisabled(true);
      const res = await reactToLike(
        childId,
        { like: matchID, reaction: "accept" },
        token
      );
      toast.success(res?.data?.message);
      navigate("/match");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleRejectLike = async () => {
    if (!activePlan) {
      toast.warning("No current plan. Upgrade to like suitors");
      navigate("/pricing");
      return;
    }
    try {
      setIsDisabled(true);
      const res = await reactToLike(
        childId,
        { like: matchID, reaction: "reject" },
        token
      );
      toast.success(res?.data?.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleUnlike = async () => {
    if (!activePlan) {
      toast.warning("No current plan. Upgrade to unlike suitors");
      navigate("/pricing");
      return;
    }
    setIsDisabled(true);
    try {
      const res = await unlikeProfile(childId, { profile: id }, token);
      toast.success(res?.data?.message);
      setIsLiked(false);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleCancelMatch = async () => {
    try {
      const res = await cancelMatch(
        childId,
        {
          match: matchDetails?.match_id,
          action: "confirm",
        },
        token
      );
      toast.success(res?.message);
      // matchDetails?.status === 'PENDING_CANCELLATION' &&
      // matchDetails?.requstedByYou
      //   ? setIsDisabled(true)
      //   : setIsDisabled(false);

      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between py-8 gap-10">
      <div className="flex flex-col sm:flex-row sm:justify-start items-center gap-4">
        <div className="flex items-center justify-center h-[155px] w-[155px] rounded-full border border-[#0000000d] bg-white box-shadow-profile z-30 relative overflow-hidden">
          <img
            src={gender?.toLowerCase() === "male" ? MaleIcon : FemaleIcon}
            alt="user icon"
            className="w-24 h-24 z-40"
          />
        </div>

        <div className="text-[#2D133A] text-center sm:text-left">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <p>
              {isChild
                ? firstName
                : !isChild && displayID
                ? displayID
                : "Waliyy User"}
            </p>
            <BsFillDiamondFill className="h-2 w-2" />
            <p>{age}</p>
          </div>
          <p className="text-lg font-bold capitalize">{profession}</p>

          <div className="flex items-center sm:justify-start justify-center gap-1 ">
            <LocationOnIcon />
            <p className="text-sm font-light capitalize">
              {lga}, {residence}
            </p>
          </div>
        </div>
      </div>

      {!isGeneral && !isChild && !isMatchPage && (
        <div className="flex items-center gap-3 self-center sm:self-end">
          {isDashboard && !isLiked && (
            <button
              onClick={handleLike}
              disabled={isDisabled}
              className="hover:bg-[#a37eff] disabled:bg-[#9A8AAC] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style px-5 flex items-center gap-2 transition-all duration-300"
            >
              <ThumbUpIcon /> Interested
            </button>
          )}
          {!isDashboard && showButton === "receiver" && (
            <>
              <button
                onClick={handleAcceptLike}
                disabled={isDisabled}
                className="hover:bg-[#a37eff] disabled:bg-[#9A8AAC] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style px-5 flex items-center gap-2 transition-all duration-300"
              >
                <ThumbUpIcon /> Accept
              </button>
              <button
                onClick={handleRejectLike}
                disabled={isDisabled}
                className="hover:bg-[#a37eff] disabled:bg-[#9A8AAC] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style px-5 flex items-center gap-2 transition-all duration-300"
              >
                <ThumbDownIcon /> Reject
              </button>
            </>
          )}
          {!isDashboard && showButton === "initator" && (
            <>
              <button
                onClick={handleUnlike}
                disabled={isDisabled}
                className="hover:bg-[#a37eff] disabled:bg-[#9A8AAC] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style px-5 flex items-center gap-2 transition-all duration-300"
              >
                <ThumbDownIcon /> Uninterested
              </button>
            </>
          )}
        </div>
      )}

      {isMatchPage && (
        <button
          onClick={handleCancelMatch}
          className="hover:bg-red-700 disabled:bg-red-300 bg-red-500 rounded-lg h-11 text-white font-medium box-shadow-style px-5 flex items-center gap-2 transition-all duration-300"
        >
          <NotInterestedIcon /> Cancel Match
        </button>
      )}
    </div>
  );
};

export default ProfileHeader;
