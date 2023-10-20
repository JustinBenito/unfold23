import React, { useState } from 'react';

const TokenSwap = () => {
  const [amountFrom, setAmountFrom] = useState('');
  const [selectedTokenFrom, setSelectedTokenFrom] = useState('ETH');
  const [amountTo, setAmountTo] = useState('');
  const [selectedTokenTo, setSelectedTokenTo] = useState('BTC');

  const handleSwap = () => {
    // Implement the swap functionality here
    // You can use the selectedTokenFrom, amountFrom, selectedTokenTo, and amountTo for this.
  };

  const popularTokens = ['ETH', 'BTC', 'ADA', 'DOT', 'LINK', 'UNI']; // Add more as needed

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <input
          type="number"
          placeholder="Amount"
          value={amountFrom}
          onChange={(e) => setAmountFrom(e.target.value)}
          className="w-full py-2 px-3 rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <select
          value={selectedTokenFrom}
          onChange={(e) => setSelectedTokenFrom(e.target.value)}
          className="mt-2 w-full py-2 px-3 rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-300"
        >
          {popularTokens.map((token) => (
            <option key={token} value={token}>
              {token}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Amount"
          value={amountTo}
          onChange={(e) => setAmountTo(e.target.value)}
          className="w-full py-2 px-3 rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <select
          value={selectedTokenTo}
          onChange={(e) => setSelectedTokenTo(e.target.value)}
          className="mt-2 w-full py-2 px-3 rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-300"
        >
          {popularTokens.map((token) => (
            <option key={token} value={token}>
              {token}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleSwap}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg w-full focus:outline-none"
      >
        Swap
      </button>
    </div>
  );
};

export default TokenSwap;
