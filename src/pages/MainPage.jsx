import React, { useState } from 'react';
import { MainTitle, SubTitle } from '../components/main/header';
import { isEmptyString } from '../utils/string';
import StockHint from '../components/main/StockHint';
import { stockList } from '../utils/stockList';

const MainPage = () => {
  const [input, setInput] = useState('');
  const [hintList, setHintList] = useState([]);

  const handleButtonClick = (e) => {
    e.preventDefault();

    if (isEmptyString(input)) {
      alert('입력값이 필요합니다');
      return;
    }

    setHintList(
      stockList
        .filter((e) => e.stock_name.toLowerCase().includes(input.toLowerCase()))
        .sort((a, b) =>
          a.stock_name
            .toLowerCase()
            .localeCompare(b.stock_name.toLowerCase(), 'ko')
        )
    );
  };

  return (
    <div
      className='container text-white z-index-20'
      style={{ margin: '80px auto 30px' }}
    >
      <div className='row' style={{ justifyContent: 'center' }}>
        <div className='col-xl-10'>
          <div
            className='text-center text-lg-start'
            style={{ marginBottom: '100px' }}
          >
            <SubTitle text='Delivery of Investment Value by AI' />
            <MainTitle text='DivA' />
          </div>

          <h2 className='mb-5' style={{ color: 'black', textAlign: 'center' }}>
            관심있는 종목을 입력해주세요
          </h2>

          <div
            className='search-bar mt-5 p-3 p-lg-1 ps-lg-4'
            style={{ width: '80%', margin: '0 auto' }}
          >
            <form action='#' onSubmit={handleButtonClick}>
              <div className='row' style={{ justifyContent: 'space-between' }}>
                <div
                  className='col-lg-4 d-flex align-items-center form-group'
                  style={{ width: '80%' }}
                >
                  <input
                    className='form-control border-0 shadow-0'
                    type='text'
                    name='search'
                    placeholder='주식 종목 검색 (일부 입력 가능, 예: 삼성)'
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                  ></input>
                </div>
                <div className='col-lg-2 d-grid'>
                  <button
                    className='btn btn-primary rounded-pill h-100'
                    type='button'
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div
            className='mt-5'
            style={{
              height: '50vh',
              overflowY: 'scroll',
              scrollbarWidth: 'none',
            }}
          >
            {hintList.map((e, index) => (
              <StockHint
                key={index}
                name={e.stock_name}
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
    </div>
  );
};

export default MainPage;
