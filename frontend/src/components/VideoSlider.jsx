import React from 'react';
import Slider from 'react-slick';
import ReactPlayer from 'react-player';

const VideoSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000, 
    pauseOnHover: true,
  };

  const videos = [
    'https://www.youtube.com/watch?v=bMknfKXIFA8',
    'https://www.youtube.com/watch?v=3JluqTojuME', 
    'https://www.youtube.com/watch?v=hdI2bqOjy3c', 
  ];

  return (
    <div className="video-slider max-w-4xl mx-auto">
      <Slider {...settings}>
        {videos.map((url, index) => (
          <div key={index} className="video-container">
            <ReactPlayer url={url} controls width="100%" height="400px" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VideoSlider;
