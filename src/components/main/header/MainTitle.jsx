import React from 'react';

const MainTitle = (props) => {
  return (
    <h1
      className='display-3 fw-bold text-shadow text-center'
      style={{ color: 'var(--color-1)' }}
    >
      {props.text}
    </h1>
  );
};

export default MainTitle;
