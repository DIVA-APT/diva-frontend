import React from 'react';

const SubTitle = (props) => {
  return (
    <p className='subtitle letter-spacing-4 mb-2 text-shadow text-center'>
      {props.text}
    </p>
  );
};

export default SubTitle;
