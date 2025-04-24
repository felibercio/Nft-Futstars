import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-secondary py-4">
      <div className="container flex items-center justify-between">
        <h1 className="text-2xl font-bold">NFT FutStar</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:text-primary">Home</a></li>
            <li><a href="/mint" className="hover:text-primary">Mint</a></li>
            <li><a href="/marketplace" className="hover:text-primary">Marketplace</a></li>
            <li><a href="/games" className="hover:text-primary">Games</a></li>
          </ul>
        </nav>
        <button className="btn-primary">Connect Wallet</button>
      </div>
    </header>
  );
}; 