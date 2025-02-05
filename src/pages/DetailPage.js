import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import ChatBotButton from '../components/ChatBotButton';
import ReactMarkdown from 'react-markdown';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import FullScreenLoader from '../components/FullScreenLoader';
import './DetailPage.css';
import { Loader2 } from 'lucide-react';

const DetailPage = () => {
  const [content, setContent] = useState({
    financial: 'null',
    'expert-analysis': null,
    news: null,
  });
  const [showVisualization, setShowVisualization] = useState(false);
  const [showReferences, setShowReferences] = useState(false);
  const [report, setReport] = useState('');
  const [referencesData, setReferencesData] = useState([]);
  const [activeTopTab, setActiveTopTab] = useState('financial');
  const [loadedCount, setLoadedCount] = useState(0);

  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState({
    financial: true,
    'expert-analysis': true,
    news: true,
  });

  const fetchContent = async (endpoint) => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `http://${process.env.REACT_APP_HOST}:8080/analysis/${endpoint}/${state.stock_code}`
      );
      console.log('이거는 내용:', response.data.content);
      setContent((prevState) => ({
        ...prevState,
        [endpoint]: response.data.content || '데이터가 없습니다',
      }));
    } catch (error) {
      console.error(error);
      setContent((prevState) => ({
        ...prevState,
        [endpoint]: `${endpoint} 데이터를 불러오는데 실패하였습니다`,
      }));
    } finally {
      setIsLoading((prevState) => ({
        ...prevState,
        [endpoint]: false,
      }));
      setLoadedCount((prev) => {
        if (prev === 0) {
          setActiveTopTab(endpoint);
        }
        return prev + 1;
      });
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

  useEffect(() => {
    fetchContent('financial');
    fetchContent('expert-analysis');
    fetchContent('news');
  }, []);

  if (
    isLoading['financial'] &&
    isLoading['expert-analysis'] &&
    isLoading['news']
  )
    return <FullScreenLoader />;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '50px',
          backgroundColor: 'var(--color-2)',
          // marginBottom: '20px',
          // paddingTop: '30px',
        }}
      >
        <button
          className={'btn'}
          style={{
            width: '30%',
            fontSize: '1rem',
            color: activeTopTab === 'financial' ? 'white' : 'black',
          }}
          onClick={() => {
            setActiveTopTab('financial');
          }}
        >
          재무제표
          {isLoading['financial'] ? (
            <>
              ..
              <Loader2 className='spin' />
            </>
          ) : (
            ''
          )}
        </button>
        <button
          className={'btn'}
          style={{
            width: '30%',
            fontSize: '1rem',
            color: activeTopTab === 'expert-analysis' ? 'white' : 'black',
          }}
          onClick={() => {
            setActiveTopTab('expert-analysis');
          }}
        >
          전문가분석
          {isLoading['expert-analysis'] ? (
            <>
              ..
              <Loader2 className='spin' />
            </>
          ) : (
            ''
          )}
        </button>
        <button
          className={'btn'}
          style={{
            width: '30%',
            fontSize: '1rem',
            color: activeTopTab === 'news' ? 'white' : 'black',
          }}
          onClick={() => {
            // fetchContent('news');
            setActiveTopTab('news');
          }}
        >
          뉴스
          {isLoading['news'] ? (
            <>
              ..
              <Loader2 className='spin' />
            </>
          ) : (
            ''
          )}
        </button>
        <button
          className={'btn'}
          style={{ width: '30%', fontSize: '1rem' }}
          onClick={() => {
            // setActiveTopTab('news');
          }}
        >
          종합 보고서
        </button>
      </div>
      <h2
        className='mb-md-0'
        style={{
          color: 'white',
          textAlign: 'center',
          margin: '30px 0',
          fontSize: '2rem',
        }}
      >
        {state.stock_name}
      </h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '100%',
          margin: '20px 0',
        }}
      >
        <div
          style={{
            // display: 'flex',
            // justifyContent: 'center',
            width: '100%',
            maxHeight: '80dvh',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              width: '60vw',
              border: '1px solid #ccc',
              boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
              padding: '20px',
              borderRadius: '1rem',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                width: '100%',
                minHeight: '150px',
                border: 'none',
                backgroundColor: 'white',
                padding: '15px',
              }}
            >
              {isLoading[activeTopTab] ? (
                <Skeleton count={10} />
              ) : (
                <ReactMarkdown>{content[activeTopTab]}</ReactMarkdown>
              )}
            </div>
          </div>
          <ul
            className='nav nav-pills-custom'
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px',
              paddingTop: '30px',
            }}
          >
            {/* <li className='nav-item'>
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
          </li> */}
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
        </div>
      </div>
      <ChatBotButton />

      <div>
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
    </div>
  );
};

export default DetailPage;
