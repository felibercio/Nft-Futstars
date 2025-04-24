import React, { useState, useEffect } from 'react';
import { FaChevronUp, FaChevronDown, FaTrophy, FaEthereum } from 'react-icons/fa';
import { NFT } from './NFTCard';

interface VerticalNFTCarouselProps {
  nfts: NFT[];
  onBuy: (nft: NFT) => void;
}

export const VerticalNFTCarousel: React.FC<VerticalNFTCarouselProps> = ({ nfts, onBuy }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextNFT = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % nfts.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevNFT = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + nfts.length) % nfts.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(nextNFT, 5000);
    return () => clearInterval(interval);
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return 'text-yellow-500 bg-yellow-500/20';
      case 'Epic':
        return 'text-purple-500 bg-purple-500/20';
      case 'Rare':
        return 'text-blue-500 bg-blue-500/20';
      default:
        return 'text-gray-500 bg-gray-500/20';
    }
  };

  return (
    <div className="relative h-[80vh] flex items-center justify-center">
      {/* Controle Superior */}
      <button
        onClick={prevNFT}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition-colors"
      >
        <FaChevronUp className="w-6 h-6" />
      </button>

      {/* Container do Carrossel */}
      <div className="relative w-full max-w-lg h-[60vh] perspective-1000">
        {nfts.map((nft, index) => {
          const isActive = index === currentIndex;
          const isPrev = (index === currentIndex - 1) || (currentIndex === 0 && index === nfts.length - 1);
          const isNext = (index === currentIndex + 1) || (currentIndex === nfts.length - 1 && index === 0);

          return (
            <div
              key={nft.id}
              className={`absolute inset-0 transition-all duration-500 ${
                isActive ? 'opacity-100 z-10 transform-none'
                : isPrev ? 'opacity-0 -translate-y-full scale-75 z-0'
                : isNext ? 'opacity-0 translate-y-full scale-75 z-0'
                : 'opacity-0 scale-50 z-0'
              }`}
            >
              {/* Card do NFT */}
              <div className="relative h-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                {/* Imagem */}
                <div className="relative h-2/3">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                </div>

                {/* Informações */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-900/90 backdrop-blur-sm">
                  {/* Badge de Raridade */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full ${getRarityColor(nft.rarity)} mb-4`}>
                    <FaTrophy className="w-4 h-4 mr-2" />
                    <span className="font-bold text-sm">{nft.rarity}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{nft.name}</h3>
                  <p className="text-gray-400 mb-4">{nft.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {nft.stats && Object.entries(nft.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-white">{value}</div>
                        <div className="text-xs text-gray-400 uppercase">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Botão de Compra */}
                  <button
                    onClick={() => onBuy(nft)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition-colors"
                  >
                    <FaEthereum className="w-5 h-5" />
                    <span>{nft.price} ETH</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controle Inferior */}
      <button
        onClick={nextNFT}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition-colors"
      >
        <FaChevronDown className="w-6 h-6" />
      </button>

      {/* Indicadores */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-2">
        {nfts.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-blue-500 w-4'
                : 'bg-gray-500 hover:bg-gray-400 cursor-pointer'
            }`}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 500);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}; 