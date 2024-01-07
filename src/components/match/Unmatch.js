import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProfileCard from '../ProfileCard';

const Unmatch = ({ value }) => {
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
        <div className="flex flex-col items-center justify-center gap-2 text-center px-8 pt-8 pb-[64px]">
          <p className="text-[#BA9FFE]">Unmatch</p>
          <p className="text-[#2D133A] font-bold text-4xl">
            These are who you have unmatched.
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
        </div>
      </CustomTabPanel>
    </div>
  );
};

export default Unmatch;
