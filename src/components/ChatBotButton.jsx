import React, { useState } from 'react';
import axios from 'axios';
import './ChatBotButton.css';

const ChatBotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { type: 'user', text: userInput }]);

    try {
      const response = await axios.post('http://localhost:8080/api/chat', {
        message: userInput,
      });

      if (response.data && response.data.botMessage) {
        setMessages((prev) => [
          ...prev,
          { type: 'bot', text: response.data.botMessage },
        ]);
      } else {
        // 예상치 못한 응답 처리
        setMessages((prev) => [...prev, { type: 'bot', text: '응답 실패' }]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: '에러가 발생했습니다.' },
      ]);
    }

    setUserInput('');
  };

  return (
    <div>
      <button className='chatbot-button' onClick={toggleChatbot}>
        <span role='img' aria-label='chat'>
          💬
        </span>
      </button>

      {isOpen && (
        <div className='chatbot-window'>
          <div className='chatbot-header'>
            <h5>챗봇</h5>
            <button onClick={toggleChatbot}>X</button>
          </div>
          <div className='chatbot-body'>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message ${msg.type === 'user' ? 'user' : 'bot'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className='chatbot-footer'>
            <input
              type='text'
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder='질문을 입력하세요...'
            />
            <button onClick={handleSendMessage}>전송</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBotButton;
