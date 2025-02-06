import React, { useState } from 'react';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import './ChatBotButton.css';
import logo1 from '../assets/logo-1.webp';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatBotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading) return;
    setUserInput('');

    setMessages((prev) => [...prev, { type: 'user', text: userInput }]);
    setIsLoading(true);

    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_HOST}:8080/chat`,
        { message: userInput }
      );
      setIsLoading(false);
      if (response.data && response.data.botMessage) {
        setMessages((prev) => [
          ...prev,
          { type: 'bot', text: response.data.botMessage },
        ]);
      } else {
        setMessages((prev) => [...prev, { type: 'bot', text: '응답 실패' }]);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: '에러가 발생했습니다.' },
      ]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* 플로팅 버튼: 챗봇 열기/닫기 */}
      <button className='chatbot-button' onClick={toggleChatbot}>
        {isOpen ? 'X' : '💬'}
      </button>

      {isOpen && (
        <div className='chatbot-window'>
          <div className='chatbot-header'>
            <div className='chatbot-header-left'>
              <img src={logo1} alt='Service Logo' className='service-logo' />
              <h5>DivA Chat</h5>
            </div>
          </div>
          <div className='chatbot-body'>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message-container ${
                  msg.type === 'user' ? 'user' : 'bot'
                }`}
              >
                {msg.type === 'bot' && (
                  <img
                    src={logo1}
                    alt='Service Logo'
                    className='service-logo'
                  />
                )}
                <div className='message'>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && <div className='loading'>잠시만 기다려주세요...</div>}
          </div>
          <div className='chatbot-footer'>
            <TextareaAutosize
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='질문을 입력하세요.'
              minRows={1}
              maxRows={5}
              style={{
                flex: 1,
                marginRight: '5px',
                padding: '8px',
                borderRadius: '10px',
                backgroundColor: '#f4f4f4',
                border: '1px solid #ccc',
                resize: 'none',
              }}
            />
            <button onClick={handleSendMessage}>전송</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBotButton;
