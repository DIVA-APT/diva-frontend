import React from 'react';
import './FullScreenLoader.css';

const FullScreenLoader = () => {
  return (
    <div className='fullscreen-loader'>
      <div className='loader'></div>
      <p>종목 분석 중..</p>
    </div>
  );
};

export default FullScreenLoader;
