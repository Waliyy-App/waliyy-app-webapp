import React from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import StraightenIcon from '@mui/icons-material/Straighten';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { GiBigDiamondRing } from 'react-icons/gi';
import FlagIcon from '@mui/icons-material/Flag';
import NoStrollerIcon from '@mui/icons-material/NoStroller';
import StrollerIcon from '@mui/icons-material/Stroller';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import NoDrinksIcon from '@mui/icons-material/NoDrinks';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { capitalize } from '../../utils.js';

const MeProfile = ({
  value,
  about,
  dressing,
  genotype,
  height,
  weight,
  hasChildren,
  smoke,
  drink,
  isMixedEthnicity,
  mixedEthnicityDescription,
  addictions,
  maritalStatus,
  nationality,
  state,
  isPolygamous
}) => {

  return (
    <CustomTabPanel value={value} index={0}>
      <div className="flex flex-col items-start gap-10 py-8">
        <div className="flex flex-col gap-6 text-[#2D133A] w-full sm:w-4/5">
          <div>
            <p className="mb-[10px] text-lg font-semibold">About Me!</p>
            <div className="whitespace-pre-wrap">{about}</div>
          </div>
          <div>
            <p className="mb-[10px] text-lg font-semibold">How do I dress?</p>
            <div className="whitespace-pre-wrap">{dressing}</div>
          </div>
        </div>

        <div className="w-full sm:w-2/5">
          <p className="text-lg font-semibold mb-4">My Details</p>
          <div className="flex flex-wrap gap-4">
            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
              <BloodtypeIcon /> {genotype}
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
              <StraightenIcon /> {`${height}m`}
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
              <FitnessCenterIcon /> {`${weight}kg`}
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
              <GiBigDiamondRing className="w-6 h-6" />
              {capitalize(maritalStatus)}
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
              <FlagIcon /> {nationality} - {state}
            </div>

            {isMixedEthnicity && (
              <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
                <FlagIcon /> {mixedEthnicityDescription}
              </div>
            )}

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
              {hasChildren ? <StrollerIcon /> : <NoStrollerIcon />}
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
              {smoke ? <SmokingRoomsIcon /> : <SmokeFreeIcon />}
            </div>

            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
              {drink ? <LocalBarIcon /> : <NoDrinksIcon />}
            </div>

             <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
              {isPolygamous ? 'Open to Polygamy' : 'Not Open to Polygamy'}
            </div>
             {console.log(isPolygamous)}
            <div className="p-2 rounded-2xl bg-[#FFF4F5] text-[#2D133A] text-xs font-bold flex items-center gap-1">
              <VaccinesIcon />
              {addictions ? '' : 'No Addictions'}
            </div>
          </div>
        </div>
      </div>
    </CustomTabPanel>
  );
};

export default MeProfile;
