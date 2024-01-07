import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProfileCard from '../ProfileCard';

const PassedProfile = ({ value }) => {
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  return (
    <div>
      <CustomTabPanel value={value} index={2}>
        <div className="flex flex-col items-center justify-center gap-3 text-center px-8 pt-8 pb-[64px]">
          <p className="text-[#2D133A] font-bold text-4xl">Passed</p>
          <p className="text-[#667085] text-xl">Everyone deserves a second chance. These are the profiles you passed on.</p>
        </div>
        <div className="flex flex-wrap gap-6">
          <ProfileCard />
        </div>
      </CustomTabPanel>
    </div>
  );
};

export default PassedProfile;
