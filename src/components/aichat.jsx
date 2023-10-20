import React, { useState, useEffect } from 'react';
import Transak from './transak';
import OpenAI from 'openai';

const AIChat = () => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState(null);
  const [chatmessage, setChatMessage] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUserMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true,
    maxRetries: 0,
  });

  const functions1=[
    {
        name: "transak",
        description: `BUY or SELL Cryptocurrency `,
        parameters: {
          type: "object",
          properties: {
            command: {
              type: "string",
              description: `BUY or SELL, default is BUY`,
            },
            fiatamount: { 
              type: "number", 
              description: `value of fiatcurrency eg. 1000, usd etc. 0 if the command is SELL`
            },
            paymentmethod:{

                type: "string",
                description: `choose the relevant option, 
                eg. 
                credit_debit_card
                apple_pay
                google_pay
                sepa_bank_transfer
                gbp_bank_transfer `
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
            },
            email:{
                type: "string",
                description: "email of the user"
            },
            walletaddress: {
                type: "string",
                description: "wallet address of user"
            },
            hideexchange: {
                type: "boolean",
                description: "hide exchange true or false"
            },
            walletform: {
                type: "boolean",
                description: "Disable Walletform true or false"
            }
          },
          required: ["command",'fiatamount','paymentmethod','fiatcurrency','countrycode','network','cryptoamount','cryptocurrency','cryptocurrencycode','email','walletaddress','walletform'],
        },
      },
]

  const handleSendMessage = () => {
    if (userMessage) {
      const message1 = [
        { role: 'system', content: 'Only use the function I provide' },
        { role: 'user', content: `${userMessage}` },
      ];

      setChatMessage(message1);
      console.log(chatmessage)
    }

  };

  useEffect(() => {
    if (chatmessage.length > 0) {
      setLoading(true);
      fetch_data()
        .then((response) => {
          setResponse(response);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [chatmessage]);

  const fetch_data = async () => {
    console.log("im in")
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-0613',
        messages: chatmessage,
        functions: functions1,
        function_call: 'auto',
      });

      console.log(response)
      setLoading(false)
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col gap-8">
      <div className="h-full rounded-2xl flex justify-center">
        {loading ? (
          <div className="text-white">Loading...</div>
        ) : response && response.model === 'gpt-3.5-turbo-0613' ? (
          <div className='p-18 w-full rounded-xl'>
            <Transak resp={response} />
          </div>
        ) : (
          <div className='text-white'></div>
        )}
      </div>

      <div className="p-4">
        <input
          type="text"
          placeholder="Type your message..."
          value={userMessage}
          onChange={handleUserMessageChange}
          className="w-full py-2 px-3 rounded-lg shadow focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover-bg-blue-600 text-white font-medium py-2 px-4 rounded-lg w-full mt-2 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChat;
