import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProfileCard from '../ProfileCard';

const LikedYou = ({ value }) => {
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
      <CustomTabPanel value={value} index={1}>
        <div className="flex flex-col items-center justify-center gap-3 text-center px-8 pt-8 pb-[64px]">
          <p className="text-[#2D133A] font-bold text-4xl">Liked You</p>
          <p className="text-[#667085] text-xl">These are the people that want to match with you. View their profile and like them back to start something beautiful.</p>
        </div>
        <div className="flex flex-wrap gap-6">
          <ProfileCard />
        </div>
      </CustomTabPanel>
    </div>
  );
};

export default LikedYou;
