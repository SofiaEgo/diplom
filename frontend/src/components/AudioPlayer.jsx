
import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';
import loFiGirl from '../assets/lofi-girl.png';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const playerRef = useRef(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="audio-player flex items-center space-x-4 bg-white bg-opacity-90 p-2 rounded-full shadow-md">
      <div className="relative">
        <img
          src={loFiGirl}
          alt="Lo-fi Girl"
          className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-all"
          onClick={handlePlayPause}
        />
        <div className={`absolute top-0 right-0 w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-red-500'}`}></div>
      </div>
      <button
        onClick={handlePlayPause}
        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition flex items-center justify-center"
      >
        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
      </button>

      <div className="flex items-center space-x-2">
        <FaVolumeUp size={18} className="text-gray-700" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24"
        />
      </div>

      <ReactPlayer
        ref={playerRef}
        url="https://www.youtube.com/watch?v=jfKfPfyJRdk"
        playing={isPlaying}
        volume={volume}
        controls={false}
        width="0px"
        height="0px"
        config={{
          youtube: {
            playerVars: {
              controls: 0,
              showinfo: 0,
              modestbranding: 1,
            },
          },
        }}
      />
    </div>
  );
};

export default AudioPlayer;
