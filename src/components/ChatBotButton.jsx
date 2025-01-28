import React, { useState } from 'react';
import './ChatBotButton.css';

const ChatBotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = () => {
    const newMessage = { type: 'user', text: userInput };
    setMessages([...messages, newMessage]);

    const botResponse = generateResponse(userInput);
    setMessages((messages) => [
      ...messages,
      { type: 'bot', text: botResponse },
    ]);
    setUserInput('');
  };

  const generateResponse = (input) => {
    // 여기에 응답 로직 구현
    if (input.toLowerCase().includes('안녕')) {
      return '안녕하세요! 어떻게 도와드릴까요?';
    }
    return '질문을 조금 더 구체적으로 해주세요.';
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
            {messages.map((msg, index) => (
              <p key={index} className={msg.type}>
                {msg.text}
              </p>
            ))}
          </div>
          <div className='chatbot-footer'>
            <input
              type='text'
              value={userInput}
              onChange={handleInputChange}
              placeholder='메시지를 입력하세요...'
            />
            <button onClick={handleSendMessage}>전송</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBotButton;
