import React, { useState } from 'react';
import { FaStar, FaGift, FaFire, FaTrophy, FaHistory, FaSearch, FaEdit, FaTrash, FaSave, FaPlus } from 'react-icons/fa';
import { PackOpeningAnimation } from './PackOpeningAnimation';

interface Pack {
  id: number;
  name: string;
  image: string;
  price: string;
  rarity: 'comum' | 'raro' | 'lendário';
  chances: {
    comum: number;
    raro: number;
    lendario: number;
  };
  cardsPerPack: number;
  guaranteedRare: boolean;
  previewCards: Card[];
}

interface Card {
  id: number;
  name: string;
  image: string;
  rarity: 'comum' | 'raro' | 'lendário';
  description?: string;
  stats?: {
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physical: number;
  };
}

interface OpenedPack {
  packId: number;
  packName: string;
  openedAt: Date;
  cards: Card[];
}

const previewCards: Card[] = [
  {
    id: 1,
    name: "Ronaldo Fenômeno",
    image: "/images/cards/ronaldo.jpg",
    rarity: "lendário",
    description: "O Fenômeno, considerado um dos maiores atacantes da história",
    stats: {
      pace: 96,
      shooting: 95,
      passing: 85,
      dribbling: 94,
      defending: 45,
      physical: 85
    }
  },
  {
    id: 2,
    name: "Pelé",
    image: "/images/cards/pele.jpg",
    rarity: "lendário"
  },
  {
    id: 3,
    name: "Neymar",
    image: "/images/cards/neymar.jpg",
    rarity: "raro"
  },
  {
    id: 4,
    name: "Zico",
    image: "/images/cards/zico.jpg",
    rarity: "raro"
  },
  {
    id: 5,
    name: "Romário",
    image: "/images/cards/romario.jpg",
    rarity: "lendário"
  },
  {
    id: 6,
    name: "Garrincha",
    image: "/images/cards/garrincha.jpg",
    rarity: "lendário"
  }
];

const packs: Pack[] = [
  {
    id: 1,
    name: "Pack Lendário",
    image: "/images/packs/legendary-pack.jpg",
    price: "0.5",
    rarity: 'lendário',
    chances: {
      comum: 60,
      raro: 30,
      lendario: 10
    },
    cardsPerPack: 5,
    guaranteedRare: true,
    previewCards: previewCards.filter(card => card.rarity === 'lendário')
  },
  {
    id: 2,
    name: "Pack Raro",
    image: "/images/packs/rare-pack.jpg",
    price: "0.3",
    rarity: 'raro',
    chances: {
      comum: 70,
      raro: 25,
      lendario: 5
    },
    cardsPerPack: 3,
    guaranteedRare: true,
    previewCards: previewCards.filter(card => ['raro', 'lendário'].includes(card.rarity))
  },
  {
    id: 3,
    name: "Pack Iniciante",
    image: "/images/packs/starter-pack.jpg",
    price: "0.1",
    rarity: 'comum',
    chances: {
      comum: 85,
      raro: 14,
      lendario: 1
    },
    cardsPerPack: 3,
    guaranteedRare: false,
    previewCards: previewCards
  }
];

export const PackDisplay = () => {
  const [selectedPack, setSelectedPack] = useState<Pack | null>(packs[0]);
  const [isHovering, setIsHovering] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showPackOpening, setShowPackOpening] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [openedPacks, setOpenedPacks] = useState<OpenedPack[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedRarity, setSelectedRarity] = useState<'todos' | 'comum' | 'raro' | 'lendário'>('todos');
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handlePackHover = (pack: Pack) => {
    setSelectedPack(pack);
    setIsHovering(true);
  };

  const handlePackShake = (pack: Pack) => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 820);
  };

  const handleOpenPack = (pack: Pack) => {
    setSelectedPack(pack);
    setShowPackOpening(true);
    
    // Simular cards aleatórios baseados nas chances
    const newCards: Card[] = [];
    for (let i = 0; i < pack.cardsPerPack; i++) {
      const random = Math.random() * 100;
      let rarity: 'comum' | 'raro' | 'lendário';
      
      if (random < pack.chances.lendario) {
        rarity = 'lendário';
      } else if (random < pack.chances.lendario + pack.chances.raro) {
        rarity = 'raro';
      } else {
        rarity = 'comum';
      }
      
      const possibleCards = previewCards.filter(card => card.rarity === rarity);
      const randomCard = possibleCards[Math.floor(Math.random() * possibleCards.length)];
      newCards.push(randomCard || previewCards[0]); // Fallback para o primeiro card se não encontrar
    }

    // Adicionar ao histórico
    const newOpenedPack: OpenedPack = {
      packId: pack.id,
      packName: pack.name,
      openedAt: new Date(),
      cards: newCards
    };
    setOpenedPacks(prev => [newOpenedPack, ...prev]);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'lendário':
        return 'text-yellow-400';
      case 'raro':
        return 'text-purple-400';
      default:
        return 'text-blue-400';
    }
  };

  const filteredCards = selectedPack?.previewCards.filter(card => 
    selectedRarity === 'todos' ? true : card.rarity === selectedRarity
  ) || [];

  const handleEditCard = (card: Card) => {
    setEditingCard({ ...card });
    setIsEditing(true);
  };

  const handleSaveCard = () => {
    if (!editingCard) return;
    
    // Aqui você implementaria a lógica para salvar as alterações
    // Por exemplo, atualizar no banco de dados ou estado global
    
    setIsEditing(false);
    setEditingCard(null);
  };

  const handleDeleteCard = (cardId: number) => {
    // Aqui você implementaria a lógica para deletar o card
    // Por exemplo, remover do banco de dados ou estado global
  };

  const renderEditForm = () => {
    if (!editingCard) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/90">
        <div className="bg-gray-800 p-6 rounded-xl max-w-2xl w-full">
          <h3 className="text-2xl font-bold text-white mb-6">Editar Card</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Nome</label>
                <input
                  type="text"
                  value={editingCard.name}
                  onChange={(e) => setEditingCard({ ...editingCard, name: e.target.value })}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Raridade</label>
                <select
                  value={editingCard.rarity}
                  onChange={(e) => setEditingCard({ ...editingCard, rarity: e.target.value as 'comum' | 'raro' | 'lendário' })}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2"
                >
                  <option value="comum">Comum</option>
                  <option value="raro">Raro</option>
                  <option value="lendário">Lendário</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Descrição</label>
                <textarea
                  value={editingCard.description || ''}
                  onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 h-24"
                />
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Estatísticas</h4>
              {Object.entries(editingCard.stats || {}).map(([stat, value]) => (
                <div key={stat} className="mb-4">
                  <label className="block text-gray-300 mb-2 capitalize">{stat}</label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="99"
                      value={value}
                      onChange={(e) => setEditingCard({
                        ...editingCard,
                        stats: {
                          ...editingCard.stats,
                          [stat]: parseInt(e.target.value)
                        }
                      })}
                      className="flex-1 mr-4"
                    />
                    <span className="text-white w-12 text-center">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveCard}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
            >
              <FaSave className="mr-2" /> Salvar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPreviewModal = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/90">
      <div className="bg-gray-800 p-6 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Cards Disponíveis em {selectedPack?.name}</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedRarity('todos')}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedRarity === 'todos' ? 'bg-white text-gray-900' : 'bg-gray-700 text-white'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedRarity('comum')}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedRarity === 'comum' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-blue-400'
                }`}
              >
                Comum
              </button>
              <button
                onClick={() => setSelectedRarity('raro')}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedRarity === 'raro' ? 'bg-purple-500 text-white' : 'bg-gray-700 text-purple-400'
                }`}
              >
                Raro
              </button>
              <button
                onClick={() => setSelectedRarity('lendário')}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedRarity === 'lendário' ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-yellow-400'
                }`}
              >
                Lendário
              </button>
            </div>
            <button
              onClick={() => setShowPreview(false)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all"
            >
              Fechar
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredCards.map((card) => (
              <div 
                key={card.id} 
                className={`bg-gray-900 rounded-lg p-3 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${
                  card.rarity === 'lendário' ? 'border-yellow-500/50 hover:border-yellow-500' :
                  card.rarity === 'raro' ? 'border-purple-500/50 hover:border-purple-500' :
                  'border-blue-500/50 hover:border-blue-500'
                }`}
              >
                <div className="relative aspect-[3/4] mb-3 group">
                  <img 
                    src={card.image} 
                    alt={card.name} 
                    className="w-full h-full object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditCard(card)}
                        className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
                      >
                        <FaEdit className="text-white" />
                      </button>
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <FaTrash className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">{card.name}</h4>
                  <div className="flex items-center space-x-2">
                    {card.rarity === 'lendário' && <FaStar className="text-yellow-400" />}
                    <span className={`text-sm ${getRarityColor(card.rarity)}`}>
                      {card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1)}
                    </span>
                  </div>
                  {card.description && (
                    <p className="text-gray-400 text-sm mt-2 line-clamp-2">{card.description}</p>
                  )}
                  {card.stats && (
                    <div className="mt-2 space-y-1">
                      {Object.entries(card.stats).map(([stat, value]) => (
                        <div key={stat} className="flex items-center text-xs">
                          <span className="text-gray-400 capitalize w-20">{stat}</span>
                          <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                value >= 90 ? 'bg-green-500' :
                                value >= 80 ? 'bg-lime-500' :
                                value >= 70 ? 'bg-yellow-500' :
                                'bg-orange-500'
                              }`}
                              style={{ width: `${value}%` }}
                            />
                          </div>
                          <span className="text-white ml-2 w-8">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FaFire className="text-orange-500" />
                <span className="text-white">Chances de Drop:</span>
              </div>
              <span className="text-yellow-400">{selectedPack?.chances.lendario}% Lendário</span>
              <span className="text-purple-400">{selectedPack?.chances.raro}% Raro</span>
              <span className="text-blue-400">{selectedPack?.chances.comum}% Comum</span>
            </div>
            <button
              onClick={() => handleEditCard({
                id: Date.now(),
                name: '',
                image: '',
                rarity: 'comum',
                description: '',
                stats: {
                  pace: 70,
                  shooting: 70,
                  passing: 70,
                  dribbling: 70,
                  defending: 70,
                  physical: 70
                }
              })}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all flex items-center space-x-2"
            >
              <FaPlus />
              <span>Novo Card</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <FaGift className="text-yellow-500 text-2xl" />
          <h2 className="text-2xl font-bold text-white">Packs de Craques</h2>
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all"
        >
          <FaHistory />
          <span>Histórico</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packs.map((pack) => (
          <div
            key={pack.id}
            className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
              isShaking ? 'animate-[shake_0.82s_cubic-bezier(.36,.07,.19,.97)_both]' : ''
            }`}
            onMouseEnter={() => handlePackHover(pack)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => handlePackShake(pack)}
          >
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border-2 border-opacity-50 hover:border-opacity-100 transition-all duration-300"
              style={{
                borderColor: pack.rarity === 'lendário' ? '#FFD700' : 
                           pack.rarity === 'raro' ? '#9333ea' : '#3b82f6'
              }}>
              <div className="relative h-64 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 to-transparent ${
                  isHovering ? 'opacity-90' : 'opacity-70'
                } transition-opacity duration-300`} />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-4 transform transition-all duration-300 group-hover:scale-110">
                    <FaGift className={`text-6xl mb-4 ${getRarityColor(pack.rarity)}`} />
                    <h3 className="text-xl font-bold text-white mb-2">{pack.name}</h3>
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      {pack.guaranteedRare && (
                        <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full flex items-center">
                          <FaTrophy className="mr-1" /> Raro Garantido
                        </span>
                      )}
                    </div>
                    <span className="text-2xl font-bold text-yellow-400">{pack.price} ETH</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-900">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-400 text-sm">{pack.cardsPerPack} Cards por Pack</span>
                  <div className="flex items-center space-x-1">
                    <FaFire className="text-orange-500" />
                    <span className="text-orange-400 text-sm">{pack.chances.lendario}% Lendário</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowPreview(true)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <FaSearch className="mr-2" />
                    Preview
                  </button>
                  <button 
                    onClick={() => handleOpenPack(pack)}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-2 px-4 rounded-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                  >
                    Abrir Pack
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Preview */}
      {showPreview && selectedPack && renderPreviewModal()}

      {/* Modal de Histórico */}
      {showHistory && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/90">
          <div className="bg-gray-800 p-6 rounded-xl max-w-2xl w-full">
            <h3 className="text-xl font-bold text-white mb-4">Histórico de Packs Abertos</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {openedPacks.map((openedPack, index) => (
                <div key={index} className="bg-gray-900 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white font-bold">{openedPack.packName}</h4>
                    <span className="text-gray-400 text-sm">
                      {new Date(openedPack.openedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {openedPack.cards.map((card, cardIndex) => (
                      <div key={cardIndex} className="relative group">
                        <img src={card.image} alt={card.name} className="w-full h-16 object-cover rounded" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="text-xs text-white text-center">{card.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowHistory(false)}
              className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Modal de Edição */}
      {isEditing && renderEditForm()}

      {/* Componente de Animação de Abertura */}
      {selectedPack && (
        <PackOpeningAnimation
          isOpen={showPackOpening}
          onClose={() => setShowPackOpening(false)}
          cards={openedPacks[0]?.cards || []}
        />
      )}
    </div>
  );
}; 