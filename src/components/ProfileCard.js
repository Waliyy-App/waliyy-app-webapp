import React, { useState, useEffect } from 'react';
import MaleIcon from '../assets/illustrations/male-illus.svg';
import FemaleIcon from '../assets/illustrations/female-illus.svg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { BsFillDiamondFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const truncateText = (text, maxWords) => {
  const words = text?.split(/\s+/);
  const truncated = words?.slice(0, maxWords).join(' ');
  return truncated + '...';
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
  displayID,
  matchID
}) => {
  const [truncatedLoremIpsum, setTruncatedLoremIpsum] = useState('');

  useEffect(() => {
    setTruncatedLoremIpsum(truncateText(about, 20));
  }, [about]);
console.log(matchID)
  return (
    <Link
      to={href || `/recommended/${id}`}
      state={{ from: state ? state : '', matchID  }}
      className="profile-card bg-[#FFF4F6] rounded-2xl px-6 pt-6 pb-8 flex flex-col gap-8 w-full cursor-pointer"
    >
      <div className="mb-auto flex flex-col gap-y-8">
        <div className="w-[128px] h-[128px] rounded-full border-4 border-[#FE8D9F] flex items-center justify-center z-30 relative overflow-hidden mx-auto">
          <img
            src={gender === 'MALE' ? MaleIcon : FemaleIcon}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-[#2D133A]">
          <div className="flex items-center gap-2  text-2xl font-bold">
            <p>{displayID ? displayID : 'Waliyy User'}</p>
            <BsFillDiamondFill className="h-2 w-2" />
            <p>{age}</p>
          </div>

          <div className="flex items-end gap-1 mb-2">
            <LocationOnIcon />
            <p className="text-sm font-light capitalize">
              {lga}, {residence}
            </p>
          </div>

          <div className="flex items-center gap-1 ">
            <WorkIcon />
            <p className="text-sm font-light capitalize">
             {profession}
            </p>
          </div>
        </div>

        <div>
          <p>{truncatedLoremIpsum}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProfileCard;
