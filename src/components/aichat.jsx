import React, { useState } from 'react';
import TokenSwap from './transactioncard';
import Transak from './transak';
import OpenAI from "openai";

const AIChat = () => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [response, setResponse]=useState([]);  

  const [chatmessage, setChatMessage]=useState([])
  const [functionmessage, setFunctionMessage]=useState([])

  const handleUserMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true,
    maxRetries: 0,
  });

  const fetch_data = async () => {
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-0613',
        messages: chatmessage,
        functions: functionmessage,
        function_call: 'auto',
      });
      console.log(chatmessage, functionmessage)
      console.log(response)
      setResponse(response)
  }

  const handleSendMessage = () => {
    if (userMessage) {
      setMessages([...messages, userMessage]);
      setUserMessage('');
    }

    if(userMessage){
        const message1=[
            {role:'system',content: "Only use the function I provide"},
            {role: "user", content: `${userMessage}` },
        ]
        setChatMessage(message1)

        const functions1=[
            {
                name: "transak",
                description: `BUY or SELL Cryptocurrency `,
                parameters: {
                  type: "object",
                  properties: {
                    command: {
                      type: "string",
                      description: `BUY or SELL`,
                    },
                    fiatamount: { 
                      type: "number", 
                      description: `value of fiatcurrency i.e rupees, usd etc. 0 if the command is SELL`
                    },
                    fiatcurrency:{
                        type: "string",
                        description: "what is the currency, eg. INR, USD, GBP",
                    },
                    countrycode:{
                        type: "string",
                        description: "what is the countrycode for the currency eg. IN,US"
                    },
                    network: { 
                      type: "string", 
                      description: `What is the network that the crypto is in eg. Ethereum`
                    },
                    cryptoamount:{
                        type: "number",
                        description: "if its SELL, how much to SELL",
                    },
                    cryptocurrency: {type: "string",
                    description: "if its SELL, what to SELL"
                    },
                    cryptocurrencycode: {
                        type: "string",
                        description: "code of the cryptocurrency"
                    }
                  },
                  required: ["command",'fiatamount','fiatcurrency','countrycode','network','cryptocurrency','cryptocurrencycode'],
                },
              },
        ]
        
        setFunctionMessage(functions1)

        fetch_data()
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
          <Transak resp={response}/>
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
