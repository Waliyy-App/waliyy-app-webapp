import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { faq } from './faqData';

const FrequentlyAskedQuestions = () => {
  const [showInfo, setShowInfo] = useState(1);
  return (
    <div className="w-4/5 sm:w-3/5 mt-24 mx-auto flex flex-col gap-4 text-[#2D133A] bg-white dark:bg-white">
      <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center">
        Frequently Asked Questions
      </h2>
      {faq.map(({ id, question, answer }) => (
        <div
          key={id}
          className="border border-gray-200 rounded-lg transition-all duration-500"
        >
          <h2>
            <button
              type="button"
              onClick={() => setShowInfo(id === showInfo ? null : id)}
              className={`flex items-center justify-between hover:rounded-t-lg w-full p-5 font-medium rtl:text-right text-lg gap-3 hover:bg-[#2d133a] hover:text-white transition-all duration-500 ${
                showInfo === id && 'bg-[#2d133a] rounded-t-lg text-white'
              }`}
            >
              <span className="text-left">{question}</span>
              {showInfo === id ? <RemoveIcon /> : <AddIcon />}
            </button>
          </h2>
          {showInfo === id && (
            <div className="p-5 border-t">
              <p className="ml-3">{answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FrequentlyAskedQuestions;
