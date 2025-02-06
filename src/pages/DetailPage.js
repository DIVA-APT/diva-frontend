/* eslint-disable */

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
import remarkGfm from 'remark-gfm';

const DetailPage = () => {
  const [content, setContent] = useState({
    financial: { content: '', sources: [] },
    'expert-analysis': { content: '', sources: [] },
    news: { content: '', sources: [] },
  });

  const [report, setReport] = useState('');

  // 탭 활성화 여부
  const [activeTopTab, setActiveTopTab] = useState('financial');
  const [showVisualization, setShowVisualization] = useState(false);
  const [showReferences, setShowReferences] = useState(false);

  // 탭별 로딩 상태
  const [isLoading, setIsLoading] = useState({
    financial: true,
    'expert-analysis': true,
    news: true,
    report: true,
  });
  const [loadedCount, setLoadedCount] = useState(0);

  const { state } = useLocation();

  const fetchContent = async (endpoint) => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `http://${process.env.REACT_APP_HOST}:8080/analysis/${endpoint}/${state.stock_code}`
      );
      console.log(endpoint, '응답 데이터:', response.data);

      // 백엔드 응답 예시: { content: "...", sources: [ {title,description,url}, ... ] }
      const { content: mainContent, sources } = response.data;

      setContent((prev) => ({
        ...prev,
        [endpoint]: {
          content: mainContent || '데이터가 없습니다.',
          sources: sources || [],
        },
      }));
    } catch (error) {
      console.error(error);
      setContent((prev) => ({
        ...prev,
        [endpoint]: {
          content: `${endpoint} 데이터를 불러오는데 실패했습니다.`,
          sources: [],
        },
      }));
    } finally {
      setIsLoading((prev) => ({
        ...prev,
        [endpoint]: false,
      }));
      setLoadedCount((prev) => {
        if (prev === 0) {
          // 첫 로딩된 탭을 기본 탭으로
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
    } finally {
      setIsLoading((prev) => ({
        ...prev,
        report: false,
      }));
    }
  };

  // 3개 탭 -> report 순으로 비동기 호출
  useEffect(() => {
    Promise.all([
      fetchContent('financial'),
      fetchContent('expert-analysis'),
      fetchContent('news'),
    ]).then(() => fetchReport());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    isLoading.financial ||
    isLoading['expert-analysis'] ||
    isLoading.news ||
    isLoading.report
  ) {
    return <FullScreenLoader />;
  }

  // report 탭이 아니라면 content에서 가져옴
  const activeContent =
    activeTopTab === 'report' ? null : content[activeTopTab];

  const getButtonStyle = (tabName) => ({
    width: '30%',
    fontSize: '1rem',
    color: activeTopTab === tabName ? 'white' : 'black',
  });

  return (
    <div>
      {/* 상단 탭 버튼들 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '50px',
          backgroundColor: 'var(--color-2)',
        }}
      >
        <button
          className='btn'
          style={getButtonStyle('financial')}
          onClick={() => setActiveTopTab('financial')}
        >
          재무제표
        </button>

        <button
          className='btn'
          style={getButtonStyle('expert-analysis')}
          onClick={() => setActiveTopTab('expert-analysis')}
        >
          전문가분석
        </button>

        <button
          className='btn'
          style={getButtonStyle('news')}
          onClick={() => setActiveTopTab('news')}
        >
          뉴스
        </button>

        <button
          className='btn'
          style={{ width: '30%', fontSize: '1rem' }}
          onClick={() => setActiveTopTab('report')}
        >
          종합 보고서
        </button>
      </div>

      {/* 종목명 표시 */}
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

      {/* 메인 내용 영역 */}
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
            width: '100%',
            maxHeight: '80dvh',
            overflowY: 'auto',
          }}
        >
          {/* 탭 내용 박스 */}
          <div
            style={{
              width: '1050px',
              border: '1px solid #ccc',
              boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
              padding: '20px',
              borderRadius: '1rem',
              margin: '0 auto',
              backgroundColor: 'white',
            }}
          >
            <div
              style={{
                width: '100%',
                minHeight: '150px',
                border: 'none',
                padding: '15px',
                borderRadius: '10px',
              }}
            >
              {activeTopTab === 'report' ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {report || '종합 보고서 정보가 없습니다.'}
                </ReactMarkdown>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {activeContent.content}
                </ReactMarkdown>
              )}
            </div>
          </div>

          {/* 추가 버튼 */}
          <ul
            className='nav nav-pills-custom'
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px',
              paddingTop: '30px',
            }}
          >
            {activeTopTab !== 'report' && (
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
            )}
          </ul>

          <div>
            {/* 참고 자료 및 출처 (report 탭 제외) */}
            {showReferences && activeTopTab !== 'report' && (
              <div style={{ maxWidth: '1000px', margin: '20px auto' }}>
                <div
                  style={{
                    padding: '20px',
                    border: '1px solid #ccc',
                    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
                    marginBottom: '20px',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                  }}
                >
                  <h5>참고 자료 및 출처</h5>
                  {activeContent.sources.length > 0 ? (
                    activeContent.sources.map((item, idx) => (
                      <div key={idx} style={{ marginBottom: '1rem' }}>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>
                          {item.title}
                        </p>
                        <p style={{ margin: '0.5rem 0' }}>{item.description}</p>
                        <p style={{ margin: 0 }}>
                          {item.url ? (
                            <a
                              href={item.url}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              {item.url}
                            </a>
                          ) : (
                            'URL이 없습니다.'
                          )}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p> 출처가 없습니다.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 챗봇 버튼 */}
      <ChatBotButton />

      {/* 추가 섹션들 */}
    </div>
  );
};

export default DetailPage;
