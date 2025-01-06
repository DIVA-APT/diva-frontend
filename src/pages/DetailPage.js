import React, { useState } from 'react';

const DetailPage = () => {
  const [showVisualization, setShowVisualization] = useState(false); // 이미지 표시 상태를 관리합니다.
  const [showReferences, setShowReferences] = useState(false); // 참고 자료 및 출처 표시 상태를 관리합니다.

  return (
    <div>
      <div
        className='col-md-8'
        style={{
          background: 'center center',
          backgroundColor: '#EAD8B1',
          width: '100%',
          textAlign: 'center',
          padding: '20px 0',
        }}
      >
        <h2 className='mb-md-0'>삼성전자</h2>
        <p className='subtitle text-secondary'>
          Current Price: 50,000 | Change: +1.23%
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
          paddingTop: '30px',
        }}
      >
        <button
          className='btn btn-outline-primary'
          style={{ margin: '0 10px' }}
          href='#'
          role='button'
        >
          재무 현황
        </button>
        <button
          className='btn btn-outline-primary'
          style={{ margin: '0 10px' }}
          href='#'
          role='button'
        >
          정책 동향 및 관련 뉴스
        </button>
        <button
          className='btn btn-outline-primary'
          style={{ margin: '0 10px' }}
          href='#'
          role='button'
        >
          전문가 분석
        </button>
        <button
          className='btn btn-outline-primary'
          style={{ margin: '0 10px' }}
          href='#'
          role='button'
        >
          소셜 트렌드
        </button>
      </div>

      <div
        style={{
          padding: '20px',
          maxWidth: '800px',
          margin: 'auto',
          border: '1px solid #ccc',
          boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '150px',
            border: 'none',
            padding: '10px',
          }}
        >
          재무 관련 요약
        </div>
      </div>

      <div>
        <ul
          className='nav nav-pills-custom'
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
            paddingTop: '30px',
          }}
        >
          <li className='nav-item'>
            <button
              className='nav-link btn'
              onClick={() => {
                setShowVisualization(false);
                setShowReferences(false);
              }}
            >
              종합 리포트 생성
            </button>
          </li>
          <li className='nav-item'>
            <button
              className='nav-link btn active'
              onClick={() => {
                setShowVisualization(!showVisualization);
                setShowReferences(false);
              }}
            >
              시각화 데이터
            </button>
          </li>
          <li className='nav-item'>
            <button
              className='nav-link btn'
              onClick={() => {
                setShowReferences(!showReferences);
                setShowVisualization(false);
              }}
            >
              참고 자료 및 출처
            </button>
          </li>
        </ul>
        {showVisualization && (
          <div
            style={{ maxWidth: '800px', margin: '20px auto', display: 'block' }}
          >
            <img
              src='/img/chart.png'
              alt='Visualization'
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        )}
        {showReferences && (
          <div
            style={{
              maxWidth: '800px',
              margin: '20px auto',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                padding: '20px',
                maxWidth: '800px',
                margin: 'auto',
                border: '1px solid #ccc',
                boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px  #ccc', padding: '8px' }}>
                      사용된 핵심 요약 데이터의 출처
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      네이버
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      구글
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      네이버 증권
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
