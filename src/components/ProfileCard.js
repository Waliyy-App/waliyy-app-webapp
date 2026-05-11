import React, { useState, useEffect } from 'react';
import MaleIcon from '../assets/illustrations/male-illus.svg';
import FemaleIcon from '../assets/illustrations/female-illus.svg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { BsFillDiamondFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { FaLock } from 'react-icons/fa';

const truncateText = (text, maxWords) => {
  if (!text) return { clear: '', blurred: '' };
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return { clear: text, blurred: '' };
  const clear = words.slice(0, maxWords).join(' ');
  const blurred = words.slice(maxWords).join(' ');
  return { clear, blurred };
};

const ProfileCard = ({
  id,
  about,
  residence,
  age,
  lga,
  profession,
  gender,
  state,
  href,
  onClick,
  displayID,
  matchID,
}) => {
  const { activePlan } = useAuthContext();
  const isSubscribed = !!activePlan;
  const [description, setDescription] = useState({ clear: '', blurred: '' });

  useEffect(() => {
    setDescription(truncateText(about, 10));
  }, [about]);

  return (
    <Link
      to={href || `/recommended/${id}`}
      state={{ from: state ? state : '', matchID }}
      onClick={onClick}
      className="profile-card bg-[#FFF4F6] rounded-2xl px-6 pt-6 pb-8 flex flex-col gap-8 w-full cursor-pointer relative overflow-hidden group"
    >
      <div className="flex flex-col gap-y-8 h-full">
        <div className={`transition-all duration-300 ${!isSubscribed ? 'blur-[8px] select-none' : ''}`}>
          <div className="w-[128px] h-[128px] rounded-full border-4 border-[#FE8D9F] flex items-center justify-center z-30 relative overflow-hidden mx-auto">
            <img
              src={gender === 'MALE' ? MaleIcon : FemaleIcon}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-[#2D133A] mt-8">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <p>{isSubscribed ? (displayID || 'Waliyy User') : 'Waliyy User'}</p>
              <BsFillDiamondFill className="h-2 w-2" />
              <p>{age}</p>
            </div>

            <div className="flex items-end gap-1 mb-2">
              <LocationOnIcon />
              <p className="text-sm font-light capitalize">
                {lga}, {residence}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <WorkIcon />
              <p className="text-sm font-light capitalize">{profession}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[#2D133A] leading-relaxed">
            <span className="font-medium">{description.clear}</span>
            {!isSubscribed && description.blurred && (
              <span className="blur-[4px] select-none ml-1">
                {description.blurred.substring(0, 50)}...
              </span>
            )}
            {isSubscribed && description.blurred && (
              <span className="ml-1">
                {description.blurred.split(/\s+/).slice(0, 20).join(' ')}...
              </span>
            )}
          </p>
        </div>
      </div>

      {!isSubscribed && (
        <div className="absolute top-4 left-0 right-0 z-40 px-6">
          <div className="bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg flex items-center justify-between border border-[#FE8D9F]/20">
            <div className="flex items-center gap-3">
              <div className="bg-[#FE8D9F] p-2 rounded-full text-white shadow-sm">
                <FaLock size={14} />
              </div>
              <div className="text-left">
                <h3 className="text-[#2D133A] font-bold text-xs">Premium</h3>
                <p className="text-[10px] text-[#2D133A]/70 leading-none">Unlock full details</p>
              </div>
            </div>
            <button className="bg-[#2D133A] text-white py-2 px-3 rounded-lg font-bold text-[10px] hover:bg-[#432152] transition-colors whitespace-nowrap">
              Unlock
            </button>
          </div>
        </div>
      )}
    </Link>
  );
};

export default ProfileCard;
