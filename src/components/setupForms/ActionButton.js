import React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const ActionButton = ({
  activeStep,
  handleBack,
  steps,
  handleComplete,
  handleNext,
  totalSteps,
  completedSteps,
  completed,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }} className='w-full justify-between'>
      <Button
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{
          color: 'black',
          width: '150px',
          paddingY: '10px',
          borderRadius: '8px',
          fontWeight: 'medium',
          fontFamily: 'Nunito',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          border: '1px solid #2D133A',
          textTransform: 'capitalize',
          fontSize: '16px',
        }}
      >
        <FaChevronLeft /> Back
      </Button>

      <Box sx={{ flex: '1 1 auto' }} />

      {activeStep !== steps.length &&
        (completed[activeStep] ? (
          <Typography variant="caption" sx={{ display: 'inline-block' }}>
            {steps[activeStep]} completed
            <button
              onClick={() => {
                handleComplete();
                handleNext();
              }}
              className="ml-2 bg-[#BA9FFE] hover:bg-[#a37eff] transition-all duration-300 text-white w-auto py-[10px] px-[18px] rounded-lg font-medium"
              type="submit"
            >
              <FaChevronRight />
            </button>
          </Typography>
        ) : (
          <button
            className="bg-[#BA9FFE] hover:bg-[#a37eff] transition-all duration-300 text-white w-[150px] py-[10px] rounded-lg font-medium flex items-center justify-center gap-1"
            type='submit'
          >
            {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Next'}{' '}
            <FaChevronRight />
          </button>
        ))}
    </Box>
  );
};

export default ActionButton;
