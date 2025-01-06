import React, { useState } from 'react';
import { MainTitle, SubTitle } from '../components/main/header';
import { isEmptyString } from '../utils/string';

const MainPage = () => {
  const [input, setInput] = useState('');

  const handleButtonClick = (e) => {
    e.preventDefault();

    if (isEmptyString(input)) {
      alert('입력값이 필요합니다');
      return;
    }

    alert(input);
  };

  return (
    <div
      class='container text-white z-index-20'
      style={{ margin: '80px auto 30px' }}
    >
      <div class='row' style={{ justifyContent: 'center' }}>
        <div class='col-xl-10'>
          <div
            class='text-center text-lg-start'
            style={{ marginBottom: '100px' }}
          >
            <SubTitle text='Delivery of Investment Value by AI' />
            <MainTitle text='DivA' />
          </div>

          <h2 class='mb-5' style={{ color: 'black', textAlign: 'center' }}>
            관심있는 종목을 입력해주세요
          </h2>

          <div
            class='search-bar mt-5 p-3 p-lg-1 ps-lg-4'
            style={{ width: '80%', margin: '0 auto' }}
          >
            <form action='#' onSubmit={handleButtonClick}>
              <div class='row' style={{ justifyContent: 'space-between' }}>
                <div
                  class='col-lg-4 d-flex align-items-center form-group'
                  style={{ width: '80%' }}
                >
                  <input
                    class='form-control border-0 shadow-0'
                    type='text'
                    name='search'
                    placeholder='주식 종목 검색 (일부 입력 가능, 예: 삼성)'
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                  ></input>
                </div>
                <div class='col-lg-2 d-grid'>
                  <button
                    class='btn btn-primary rounded-pill h-100'
                    type='button'
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
