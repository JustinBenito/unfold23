import React, { useState } from 'react';
import TokenSwap from './transactioncard';

const AIChat = () => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleUserMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (userMessage) {
      setMessages([...messages, userMessage]);
      setUserMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col">
      <div className="flex-grow p-8 overflow-y-auto">
        {/* Placeholder content frame */}
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <h1 className="text-2xl font-semibold mb-4">Web3 UI</h1>
          <div className="text-gray-600">
            {messages.map((message, index) => (
              <p key={index}>{message}</p>
            ))}
          </div>
          <TokenSwap />
          {/* Add more components here */}
        </div>
      </div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Type your message..."
          value={userMessage}
          onChange={handleUserMessageChange}
          onKeyPress={handleKeyPress}
          className="w-full py-2 px-3 rounded-lg shadow focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg w-full mt-2 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChat;
