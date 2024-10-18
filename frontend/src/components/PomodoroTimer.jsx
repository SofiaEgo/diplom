import React, { useState, useEffect } from 'react';
import { createPomodoroSession } from '../services/api';

const PomodoroTimer = ({ onPomodoroComplete }) => {
  const [timeLeft, setTimeLeft] = useState(1500); 
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onPomodoroComplete(isBreak);
            recordPomodoroSession(isBreak ? 'break' : 'work', 1500 - timeLeft); 
            setIsBreak(!isBreak);
            return isBreak ? 1500 : 300;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, isBreak, timeLeft, onPomodoroComplete]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(1500);
    setIsBreak(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const recordPomodoroSession = async (type, timeSpent) => {
    try {
      const sessionData = {
        studentId: 'STUDENT_ID', 
        timeSpent,
        type,
      };
      await createPomodoroSession(sessionData);
    } catch (error) {
      console.error('Error recording Pomodoro session:', error);
    }
  };
  

  return (
    <div className="pomodoro-timer p-4 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold">{isBreak ? 'Break Time' : 'Work Time'}</h2>
      <p className="text-4xl my-4">{formatTime(timeLeft)}</p>
      <div className="flex justify-center space-x-4">
        <button onClick={startTimer} className="px-4 py-2 bg-green-500 text-white rounded">
          Start
        </button>
        <button onClick={stopTimer} className="px-4 py-2 bg-red-500 text-white rounded">
          Stop
        </button>
        <button onClick={resetTimer} className="px-4 py-2 bg-blue-500 text-white rounded">
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
