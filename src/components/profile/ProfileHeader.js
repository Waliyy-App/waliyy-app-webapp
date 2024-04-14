import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsFillDiamondFill } from 'react-icons/bs';
import ThumbUpIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDownAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import MaleIcon from '../../assets/illustrations/male-illus.svg';
import FemaleIcon from '../../assets/illustrations/female-illus.svg';
import { likeProfile, unlikeProfile } from '../../services';
import { useAuthContext } from '../../context/AuthContext';

const ProfileHeader = ({
  firstName,
  age,
  profession,
  residence,
  gender,
  lga
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { token } = useAuthContext();
  const childId = localStorage.getItem('childId');
  const { id } = useParams();
  const isChild = Boolean(childId === id);

  const handleLike = async () => {
    setIsDisabled(true);
    try {
      const res = await likeProfile(
        childId,
        {
          profile: id,
        },
        token
      );
      toast.success(res?.data?.message);
      setIsDisabled(false);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsDisabled(false);
    }
  };

  const handleUnlike = async () => {
    setIsDisabled(true);
    try {
      const res = await unlikeProfile(
        childId,
        {
          profile: id,
        },
        token
      );
      toast.success(res?.data?.message);
      setIsDisabled(false);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between py-8 gap-10">
      <div className="flex flex-col sm:flex-row sm:justify-start items-center gap-4">
        <div className="flex items-center justify-center h-[155px] w-[155px] rounded-full border border-[#0000000d] bg-white box-shadow-profile z-30 relative overflow-hidden">
          <img
            src={gender?.toLowerCase() === 'male' ? MaleIcon : FemaleIcon}
            alt="user icon"
            className="w-24 h-24 z-40"
          />
        </div>

        <div className="text-[#2D133A] text-center sm:text-left">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <p>{firstName}</p>
            <BsFillDiamondFill className="h-2 w-2" />
            <p>{age}</p>
          </div>
          <p className="text-lg font-bold">{profession}</p>

          <div className="flex items-center sm:justify-start justify-center gap-1 ">
            <LocationOnIcon />
            <p className="text-sm font-light">
              {lga}, {residence}
            </p>
          </div>
        </div>
      </div>

      {!isChild && (
        <div className="flex items-center gap-3 self-center sm:self-end">
          <button
            onClick={handleLike}
            disabled={isDisabled}
            className="hover:bg-[#a37eff] disabled:bg-[#9A8AAC] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style px-5 flex items-center gap-2 transition-all duration-300"
          >
            <ThumbUpIcon /> Interested
          </button>
          <button
            onClick={handleUnlike}
            disabled={isDisabled}
            className="hover:bg-[#a37eff] disabled:bg-[#9A8AAC] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style px-5 flex items-center gap-2 transition-all duration-300"
          >
            <ThumbDownIcon /> Uninterested
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
