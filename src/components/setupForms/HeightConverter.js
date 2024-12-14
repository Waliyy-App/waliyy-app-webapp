import React, { useState } from 'react';

const HeightConverter = () => {
  const [heightInput, setHeightInput] = useState('');
  const [unit, setUnit] = useState('cm'); // 'cm' or 'feet'
  const [convertedHeight, setConvertedHeight] = useState(null);

  const convertToMeters = () => {
    let heightInMeters = 0;

    if (unit === 'cm') {
      heightInMeters = parseFloat(heightInput) / 100; // Convert cm to meters
    } else if (unit === 'feet') {
      const [feet, inches = 0] = heightInput.split("'").map(Number); // Split feet and inches
      heightInMeters = ((feet * 12 + inches) * 2.54) / 100; // Convert feet/inches to meters
    }

    setConvertedHeight(heightInMeters.toFixed(2)); // Round to 2 decimal places
  };

  return (
    <div
      className="flex items-center justify-center flex-col"
      style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}
    >
      {convertedHeight ? (
        <div style={{ marginTop: '20px', fontSize: '18px' }} className='text-center'>
          Converted Height: <strong>{convertedHeight} meters</strong>
        </div>
      ) : (
        <>
          <h2 className="text-xl mb-4">Height Converter</h2>
          <div className="my-5">
            <label>
              Enter Height:
              <input
                type="text"
                value={heightInput}
                onChange={(e) => setHeightInput(e.target.value)}
                placeholder={unit === 'cm' ? 'e.g. 180' : "e.g. 5'10"}
                className="relative text-input w-full h-11 border-b border-b-[#CDD1D0] focus:outline-none focus:border-b focus:border-b-[#BA9FFE]"
              />
            </label>
          </div>
          <div className="flex items-center">
            <label>Unit:</label>
            <select
              value={unit}
              className="relative text-input w-full h-11 border border-[#CDD1D0] rounded-lg focus:outline-none focus:border focus:border-[#BA9FFE]"
              onChange={(e) => setUnit(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px' }}
            >
              <option value="cm">Centimeters</option>
              <option value="feet">Feet & Inches</option>
            </select>
          </div>
          <button
            onClick={convertToMeters}
            className="mt-10 hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300 "
            style={{ padding: '10px 20px' }}
          >
            Convert to Meters
          </button>
        </>
      )}
    </div>
  );
};

export default HeightConverter;
