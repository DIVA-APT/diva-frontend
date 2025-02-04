import React, { useState } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import ChatBotButton from '../components/ChatBotButton';
import ReactMarkdown from 'react-markdown';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DetailPage = () => {
  const [content, setContent] = useState('내용을 선택해 주세요.');
  const [showVisualization, setShowVisualization] = useState(false);
  const [showReferences, setShowReferences] = useState(false);
  const [report, setReport] = useState('');
  const [referencesData, setReferencesData] = useState([]);
  const [activeTopTab, setActiveTopTab] = useState(null);

  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  // console.log('DetailPage - received state:', state);

  const fetchContent = async (endpoint) => {
    setIsLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `http://${process.env.REACT_APP_HOST}:8080/analysis/${endpoint}/${state.stock_code}`
      );
      console.log('이거는 내용:', response.data.content);
      setContent(response.data.content || '데이터가 없습니다.');
    } catch (error) {
      console.error(error);
      setContent('데이터를 불러오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReport = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `http://${process.env.REACT_APP_HOST}:8080/analysis/report/${state.stock_code}`
      );
      setReport(response.data.content || '리포트 데이터가 없습니다.');
    } catch (error) {
      console.error(error);
      setReport('리포트 데이터를 불러오는 데 실패했습니다.');
    }
  };

  const fetchReferences = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `http://${process.env.REACT_APP_HOST}:8080/analysis/source/${state.stock_code}`
      );
      setReferencesData(response.data.sources || []);
    } catch (error) {
      console.error(error);
      setReferencesData([]);
    }
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
          className={`btn ${
            activeTopTab === 'financial' ? 'btn-primary' : 'btn-outline-primary'
          }`}
          style={{ margin: '0 10px' }}
          onClick={() => {
            fetchContent('financial');
            setActiveTopTab('financial');
          }}
        >
          재무 제표
        </button>

        <button
          className={`btn ${
            activeTopTab === 'macroeconomics'
              ? 'btn-primary'
              : 'btn-outline-primary'
          }`}
          style={{ margin: '0 10px' }}
          onClick={() => {
            fetchContent('macroeconomics');
            setActiveTopTab('macroeconomics');
          }}
        >
          거시 경제 및 정책
        </button>

        <button
          className={`btn ${
            activeTopTab === 'investment-movement'
              ? 'btn-primary'
              : 'btn-outline-primary'
          }`}
          style={{ margin: '0 10px' }}
          onClick={() => {
            fetchContent('investment-movement');
            setActiveTopTab('investment-movement');
          }}
        >
          시장 심리 및 투자 동향
        </button>

        <button
          className={`btn ${
            activeTopTab === 'expert-analysis'
              ? 'btn-primary'
              : 'btn-outline-primary'
          }`}
          style={{ margin: '0 10px' }}
          onClick={() => {
            fetchContent('expert-analysis');
            setActiveTopTab('expert-analysis');
          }}
        >
          전문가 분석
        </button>

        <button
          className={`btn ${
            activeTopTab === 'news' ? 'btn-primary' : 'btn-outline-primary'
          }`}
          style={{ margin: '0 10px' }}
          onClick={() => {
            fetchContent('news');
            setActiveTopTab('news');
          }}
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
          {isLoading ? (
            <Skeleton count={10} />
          ) : (
            <ReactMarkdown>{content}</ReactMarkdown>
          )}
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
              onClick={async () => {
                setShowVisualization(false);
                setShowReferences(false);
                await fetchReport();
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
                // report 비움
                setReport('');
              }}
            >
              시각화 데이터
            </button>
          </li>
          <li className='nav-item'>
            <button
              className='nav-link btn'
              onClick={async () => {
                setShowReferences(!showReferences);
                setShowVisualization(false);
                // 종합 리포트 숨김
                setReport('');
                if (!showReferences) {
                  await fetchReferences();
                }
              }}
            >
              참고 자료 및 출처
            </button>
          </li>
        </ul>

        {!showVisualization && !showReferences && report && (
          <div style={{ maxWidth: '800px', margin: '20px auto' }}>
            <div
              style={{
                padding: '20px',
                border: '1px solid #ccc',
                boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
                marginBottom: '20px',
              }}
            >
              <h5>종합 리포트</h5>
              <p>{report}</p>
            </div>
          </div>
        )}

        {showVisualization && (
          <div style={{ maxWidth: '800px', margin: '20px auto' }}>
            <div
              style={{
                padding: '20px',
                border: '1px solid #ccc',
                boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              <h5>시각화 데이터</h5>
              <img
                src='/img/chart.png'
                alt='Visualization'
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        )}

        {showReferences && (
          <div style={{ maxWidth: '800px', margin: '20px auto' }}>
            <div
              style={{
                padding: '20px',
                border: '1px solid #ccc',
                boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
                marginBottom: '20px',
              }}
            >
              <h5>참고 자료 및 출처</h5>
              {referencesData.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ border: '1px solid #ccc', padding: '8px' }}>
                        사용된 핵심 요약 데이터의 출처
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {referencesData.map((source, idx) => (
                      <tr key={idx}>
                        <td
                          style={{ border: '1px solid #ccc', padding: '8px' }}
                        >
                          {source}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>출처 데이터를 찾을 수 없습니다.</p>
              )}
            </div>
          </div>
        )}
      </div>
      <ChatBotButton />
    </div>
  );
};

export default DetailPage;
