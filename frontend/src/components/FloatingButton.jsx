import React, { useState } from 'react';
import { FaClock } from 'react-icons/fa';
import PomodoroTimer from './PomodoroTimer';
import FocusCalendar from './FocusCalendar';

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-5 flex flex-col items-end">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-500 transition"
      >
        <FaClock size={20} />
      </button>
      {isOpen && (
        <div className="mt-4 space-y-4">
          <FocusCalendar />
          <PomodoroTimer />
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
