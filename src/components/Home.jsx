import React, { useState } from 'react';

const Web3App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.error('Error connecting wallet: ', error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen flex flex-col justify-center items-center">
      <div className="text-white text-5xl font-bold mb-4">
        Your Web3 App
      </div>
      <div className="text-white text-2xl">
        Discover the decentralized world.
      </div>
      <div className="absolute top-4 right-4">
        {walletAddress ? (
          <div className="text-white">
            Connected Wallet: {walletAddress}
          </div>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full focus:outline-none"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Web3App;
