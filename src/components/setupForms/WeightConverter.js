import React, { useState } from 'react';

const WeightConverter = () => {
  const [weightInput, setWeightInput] = useState('');
  const [unit, setUnit] = useState('grams'); // 'grams' or 'pounds'
  const [convertedWeight, setConvertedWeight] = useState(null);

  const convertToKilograms = () => {
    let weightInKilograms = 0;

    if (unit === 'grams') {
      weightInKilograms = parseFloat(weightInput) / 1000; // Convert grams to kilograms
    } else if (unit === 'pounds') {
      weightInKilograms = parseFloat(weightInput) * 0.453592; // Convert pounds to kilograms
    }

    setConvertedWeight(weightInKilograms.toFixed(2)); // Round to 2 decimal places
  };

  return (
    <div
      className="flex items-center justify-center flex-col"
      style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}
    >
      {convertedWeight ? (
        <div
          style={{ marginTop: '20px', fontSize: '18px' }}
          className="text-center"
        >
          Converted Weight: <strong>{convertedWeight} kg</strong>
        </div>
      ) : (
        <>
          <h2 className="text-xl mb-4">Weight Converter</h2>
          <div className="my-5">
            <label>
              Enter Weight:
              <input
                type="text"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                placeholder={unit === 'grams' ? 'e.g., 5000' : 'e.g., 150'}
                className="relative text-input w-full h-11 border-b border-b-[#CDD1D0] focus:outline-none focus:border-b focus:border-b-[#BA9FFE]"
              />
            </label>
          </div>
          <div className="flex items-center">
            <label>Unit:</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="relative text-input w-full h-11 border border-[#CDD1D0] rounded-lg focus:outline-none focus:border focus:border-[#BA9FFE]"
              style={{ marginLeft: '10px', padding: '5px' }}
            >
              <option value="grams">Grams</option>
              <option value="pounds">Pounds</option>
            </select>
          </div>
          <button
            onClick={convertToKilograms}
            className="mt-10 hover:bg-[#a37eff] bg-[#BA9FFE] rounded-lg h-11 text-white font-medium box-shadow-style transition-all duration-300 "
            style={{ padding: '10px 20px' }}
          >
            Convert to Kilograms
          </button>
        </>
      )}
    </div>
  );
};

export default WeightConverter;
