import React, { useState } from 'react';
import { useLocation } from 'react-router';

const DetailPage = () => {
  const [content, setContent] = useState('내용을 선택해 주세요.');
  const [showVisualization, setShowVisualization] = useState(false);
  const [showReferences, setShowReferences] = useState(false);
  const { state } = useLocation();
  const [report, setReport] = useState('');

  // 임시 데이터
  const data = {
    finance: '재무 제표 현황을 보여준다.',
    macroeconomics: '정책 동향 거시 경제 관련 내용이 들어온다.',
    investmentMovement: '시장 심리와 투자 동향을 알려준다.',
    expertAnalysis: '전문가들이 분석한 내용이 들어온다.',
    news: '뉴스 데이터가 들어옵니다.',
    report: '종합 리포트 내용이 들어옵니다.',
  };

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
        <h2 className='mb-md-0'>{state.stock_name}</h2>
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
          onClick={() => setContent(data.finance)}
        >
          재무 제표
        </button>
        <button
          className='btn btn-outline-primary'
          style={{ margin: '0 10px' }}
          onClick={() => setContent(data.macroeconomics)}
        >
          거시 경제 및 정책
        </button>
        <button
          className='btn btn-outline-primary'
          style={{ margin: '0 10px' }}
          onClick={() => setContent(data.investmentMovement)}
        >
          시장 심리 및 투자 동향
        </button>
        <button
          className='btn btn-outline-primary'
          style={{ margin: '0 10px' }}
          onClick={() => setContent(data.expertAnalysis)}
        >
          전문가 분석
        </button>
        <button
          className='btn btn-outline-primary'
          style={{ margin: '0 10px' }}
          onClick={() => setContent(data.news)}
        >
          뉴스
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
            minHeight: '150px',
            border: 'none',
            padding: '10px',
          }}
        >
          {content}
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
                setReport(data.report);
              }}
            >
              종합 리포트 생성
            </button>
          </li>
          <li className='nav-item'>
            <button
              className='nav-link btn'
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
        {!showVisualization && !showReferences && (
          <div
            style={{ maxWidth: '800px', margin: '20px auto', display: 'block' }}
          >
            {report}
          </div>
        )}

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
