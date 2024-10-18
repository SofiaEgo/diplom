import React, { useState } from 'react';
import { FaComments } from 'react-icons/fa';
import ChatInterface from './ChatInterface';

const ChatFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-20 flex flex-col items-end">
    
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full shadow-lg hover:bg-green-400 transition transform hover:scale-105"
      >
        <FaComments size={20} />
      </button>
      {isOpen && (
        <div className="mt-4 rounded-lg shadow-2xl w-80 h-96 animate-fade-in-down">
          <ChatInterface />
        </div>
      )}
    </div>
  );
};

export default ChatFloatingButton;
