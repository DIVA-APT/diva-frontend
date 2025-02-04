import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './NewMainPage.css';
import { isEmptyString } from '../utils/string';
import { stockList } from '../utils/stockList';
import StockHint from '../components/main/StockHint';

const NewMainPage = () => {
  const [scrolled, setScrolled] = useState(false);

  const [input, setInput] = useState('');
  const [hintList, setHintList] = useState([]);

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    updateHintList(e.target.value);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();

    if (isEmptyString(input)) {
      alert('입력값이 필요합니다');
      return;
    }

    updateHintList(input);
  };

  const updateHintList = (value) => {
    const result = stockList.filter((e) =>
      e.stock_name.toLowerCase().includes(value.toLowerCase())
    );

    if (result.length === 0) {
      return;
    }

    setHintList(
      result.sort((a, b) =>
        a.stock_name
          .toLowerCase()
          .localeCompare(b.stock_name.toLowerCase(), 'ko')
      )
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='main-container'>
      {/* 서비스명 */}
      <motion.h1
        className='service-title'
        initial={{ y: 0, opacity: 1 }}
        animate={scrolled ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span style={{ color: 'var(--color-3)' }}>D</span>elivery of
        <span style={{ color: 'var(--color-3)' }}> I</span>nvestment{' '}
        <span style={{ color: 'var(--color-3)' }}>V</span>alue by{' '}
        <span style={{ color: 'var(--color-3)' }}>A</span>I
        {!scrolled && (
          <motion.div
            className='scroll-indicator'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            ⬇ 아래로 스크롤 해주세요 ⬇
          </motion.div>
        )}
      </motion.h1>

      {/* 새로운 컴포넌트 (중앙으로 이동) */}
      <motion.div
        className='content-container'
        initial={{ y: 50, opacity: 0 }}
        animate={scrolled ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        <div
          className='row'
          style={{
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
            height: '50%',
          }}
        >
          <div className='col-xl-10'>
            <h2
              className='mb-5'
              style={{
                color: 'white',
                textAlign: 'center',
                height: '80%',
                fontSize: '3rem',
              }}
            >
              관심있는 종목을 입력해주세요
            </h2>

            <div
              className='search-bar mt-5 p-3 p-lg-1 ps-lg-4'
              style={{ width: '80%', margin: '0 auto' }}
            >
              <form action='#' onSubmit={handleButtonClick}>
                <div
                  className='row'
                  style={{ justifyContent: 'space-between' }}
                >
                  <div
                    className='col-lg-4 d-flex align-items-center form-group'
                    style={{ width: '80%' }}
                  >
                    <input
                      className='form-control border-0 shadow-0'
                      type='text'
                      name='search'
                      placeholder='주식 종목 검색 (일부 입력 가능, 예: 삼성)'
                      onChange={handleInputChange}
                      value={input}
                    ></input>
                  </div>
                  <div className='col-lg-2 d-grid'>
                    <button
                      className='btn btn-primary rounded-pill h-100'
                      type='button'
                      onClick={handleButtonClick}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div
              className='mt-1'
              style={{
                height: '50vh',
                overflowY: 'scroll',
                scrollbarWidth: 'none',
              }}
            >
              {hintList.map((e, index) => (
                <StockHint
                  key={index}
                  data={e}
                  style={
                    index === hintList.length - 1
                      ? { borderBottom: '1px solid #d6dbd6' }
                      : {}
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NewMainPage;
