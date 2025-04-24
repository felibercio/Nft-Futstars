import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaGift } from 'react-icons/fa';

interface Card {
  id: number;
  name: string;
  image: string;
  rarity: 'comum' | 'raro' | 'lendário';
}

interface PackOpeningAnimationProps {
  isOpen: boolean;
  onClose: () => void;
  cards: Card[];
}

export const PackOpeningAnimation = ({ isOpen, onClose, cards }: PackOpeningAnimationProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(-1);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentCardIndex(-1);
      const timer = setTimeout(() => {
        setCurrentCardIndex(0);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (currentCardIndex >= 0 && cards[currentCardIndex]?.rarity === 'lendário') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [currentCardIndex, cards]);

  const handleNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'lendário':
        return 'from-yellow-400 to-yellow-600';
      case 'raro':
        return 'from-purple-400 to-purple-600';
      default:
        return 'from-blue-400 to-blue-600';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/90"
        >
          {currentCardIndex === -1 ? (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-64 h-96 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-xl shadow-2xl cursor-pointer"
              onClick={() => setCurrentCardIndex(0)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <FaGift className="text-white text-6xl animate-pulse" />
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                Clique para abrir
              </div>
            </motion.div>
          ) : (
            <div className="relative">
              {showConfetti && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        x: 0, 
                        y: 0,
                        scale: 0 
                      }}
                      animate={{ 
                        x: Math.random() * 400 - 200,
                        y: Math.random() * 400 - 200,
                        scale: 1,
                        rotate: Math.random() * 360
                      }}
                      transition={{ duration: 1, delay: i * 0.02 }}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    />
                  ))}
                </div>
              )}
              
              <motion.div
                key={currentCardIndex}
                initial={{ scale: 0, rotateY: 180 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ duration: 0.5 }}
                className={`w-64 h-96 rounded-xl shadow-2xl overflow-hidden cursor-pointer bg-gradient-to-br ${getRarityColor(cards[currentCardIndex].rarity)}`}
                onClick={handleNextCard}
              >
                <img
                  src={cards[currentCardIndex].image}
                  alt={cards[currentCardIndex].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-bold text-lg">{cards[currentCardIndex].name}</h3>
                  <div className="flex items-center mt-1">
                    {cards[currentCardIndex].rarity === 'lendário' && (
                      <div className="flex items-center space-x-1">
                        <FaStar className="text-yellow-400" />
                        <span className="text-yellow-400 text-sm">Lendário!</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
              
              <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
                Clique para próximo card ({currentCardIndex + 1}/{cards.length})
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 