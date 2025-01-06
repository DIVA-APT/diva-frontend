import React from 'react';

const NotFoundPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '200px auto',
      }}
    >
      <h1
        style={{
          fontSize: '4rem',
          color: 'var(--color-2)',
          fontWeight: 'bold',
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: '3rem',
          color: 'var(--color-1)',
          fontWeight: 'bold',
        }}
      >
        존재하지 않는 페이지입니다
      </p>
    </div>
  );
};

export default NotFoundPage;
