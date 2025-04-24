import React from 'react';
import { FaEthereum } from 'react-icons/fa';

type NFTStats = {
  pace: number;
  shooting: number;
  passing: number;
};

export type NFT = {
  id: number;
  name: string;
  image: string;
  rarity: 'Legendary' | 'Epic' | 'Rare';
  price: string;
  stats: NFTStats;
  description: string;
  isGif?: boolean;
};

interface NFTCardProps {
  nft: NFT;
  onBuy: (nft: NFT) => void;
}

export const NFTCard: React.FC<NFTCardProps> = ({ nft, onBuy }) => {
  const rarityColors = {
    Legendary: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
    Epic: 'bg-gradient-to-r from-purple-400 to-purple-600',
    Rare: 'bg-gradient-to-r from-blue-400 to-blue-600'
  };

  const statBars = (value: number) => {
    return (
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-green-500 h-2 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={nft.image}
          alt={nft.name}
          className={`w-full h-64 object-cover ${nft.isGif ? 'object-contain bg-black' : 'object-cover'}`}
        />
        <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-bold text-white ${rarityColors[nft.rarity]}`}>
          {nft.rarity}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{nft.name}</h3>
        <p className="text-gray-400 text-sm mb-4">{nft.description}</p>

        <div className="space-y-3 mb-4">
          <div>
            <div className="flex justify-between text-gray-300 text-sm mb-1">
              <span>Pace</span>
              <span>{nft.stats.pace}</span>
            </div>
            {statBars(nft.stats.pace)}
          </div>
          <div>
            <div className="flex justify-between text-gray-300 text-sm mb-1">
              <span>Shooting</span>
              <span>{nft.stats.shooting}</span>
            </div>
            {statBars(nft.stats.shooting)}
          </div>
          <div>
            <div className="flex justify-between text-gray-300 text-sm mb-1">
              <span>Passing</span>
              <span>{nft.stats.passing}</span>
            </div>
            {statBars(nft.stats.passing)}
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-700">
          <div className="flex items-center space-x-1">
            <FaEthereum className="text-blue-400" />
            <span className="text-lg font-bold text-white">{nft.price}</span>
          </div>
          <button
            onClick={() => onBuy(nft)}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <span>Comprar NFT</span>
          </button>
        </div>
      </div>
    </div>
  );
}; 