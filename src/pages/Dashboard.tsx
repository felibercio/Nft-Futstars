import React, { useState } from 'react';
import { FaFilter, FaFootballBall, FaMobile, FaQrcode, FaStore, FaGamepad, FaLayerGroup, FaGem, FaStar, FaCrown, FaBox, FaTrophy } from 'react-icons/fa';
import { NFTCard, NFT } from '../components/NFTCard';
import { Timer } from '../components/Timer';
import { Link, useNavigate } from 'react-router-dom';
import { RareNFTCarousel } from '../components/RareNFTCarousel';
import { VerticalNFTCarousel } from '../components/VerticalNFTCarousel';

// Dados simulados de NFTs
const mockNFTs: NFT[] = [
  {
    id: 1,
    name: "Cafu - O Penta é Nosso",
    image: "https://media.tenor.com/LLakyetgQVYAAAAC/brasil-campeão-cafu.gif",
    rarity: "Legendary",
    price: "5.0",
    stats: { pace: 88, shooting: 75, passing: 89 },
    description: "Momento histórico: Cafu beija a taça da Copa do Mundo de 2002, eternizando o penta para o Brasil",
    isGif: true
  },
  {
    id: 2,
    name: "Vini Jr. - Drible Mágico",
    image: "https://media.giphy.com/media/3oEduPQqbpT1LqVOz6/giphy.gif",
    rarity: "Epic",
    price: "1.8",
    stats: { pace: 95, shooting: 82, passing: 84 },
    description: "Lance espetacular contra o Liverpool na final da Champions",
    isGif: true
  },
  {
    id: 3,
    name: "Rodrygo - Momento Decisivo",
    image: "https://media.giphy.com/media/3oEduPQqbpT1LqVOz6/giphy.gif",
    rarity: "Epic",
    price: "1.5",
    stats: { pace: 89, shooting: 81, passing: 80 },
    description: "Gol da classificação contra o Chelsea nas quartas de final",
    isGif: true
  },
  {
    id: 4,
    name: "Endrick - Primeiro Gol",
    image: "https://media.giphy.com/media/3oEduPQqbpT1LqVOz6/giphy.gif",
    rarity: "Legendary",
    price: "3.0",
    stats: { pace: 93, shooting: 85, passing: 78 },
    description: "Momento histórico: primeiro gol com a camisa merengue",
    isGif: true
  },
  {
    id: 5,
    name: "Raphinha - Pintura",
    image: "https://media.giphy.com/media/3oEduPQqbpT1LqVOz6/giphy.gif",
    rarity: "Rare",
    price: "1.2",
    stats: { pace: 88, shooting: 84, passing: 83 },
    description: "Golaço de fora da área no clássico contra o Real Madrid",
    isGif: true
  }
];

// Dados simulados de revelações recentes
const recentReveals = [
  {
    id: 1,
    user: "0x7a23...4f9d",
    packType: "Pack Lendário",
    timestamp: "há 2 minutos",
    nfts: [
      {
        name: "Ronaldo - Final 2002",
        rarity: "Legendary",
        image: "https://media.tenor.com/xyz123/ronaldo-2002.gif"
      },
      {
        name: "Romário - USA 94",
        rarity: "Epic",
        image: "https://media.tenor.com/abc456/romario-94.gif"
      }
    ]
  },
  {
    id: 2,
    user: "0x3f12...8e5c",
    packType: "Pack Premium",
    timestamp: "há 5 minutos",
    nfts: [
      {
        name: "Pelé - México 70",
        rarity: "Legendary",
        image: "https://media.tenor.com/def789/pele-70.gif"
      }
    ]
  },
  {
    id: 3,
    user: "0x9b45...2d1a",
    packType: "Pack Básico",
    timestamp: "há 8 minutos",
    nfts: [
      {
        name: "Zico - Flamengo 81",
        rarity: "Epic",
        image: "https://media.tenor.com/ghi012/zico-81.gif"
      }
    ]
  }
];

// Atualizando a seção de NFTs para usar o carrossel vertical
const nfts = [
  {
    id: '1',
    name: 'Pelé - Gol Milésimo',
    image: '/images/pele-milesimo-gol.jpg',
    description: 'O histórico milésimo gol de Pelé, marcado no Maracanã em 1969.',
    rarity: 'Legendary',
    price: '10.0',
    stats: {
      'Valor Histórico': '100',
      'Raridade': '99',
      'Popularidade': '95'
    }
  },
  {
    id: '2',
    name: 'Garrincha - Drible Mágico',
    image: '/images/garrincha-drible.jpg',
    description: 'O drible característico de Garrincha que encantou o mundo na Copa de 1962.',
    rarity: 'Epic',
    price: '7.5',
    stats: {
      'Técnica': '98',
      'Impacto': '92',
      'Raridade': '88'
    }
  },
  {
    id: '3',
    name: 'Zico - Falta Perfeita',
    image: '/images/zico-falta.jpg',
    description: 'A famosa cobrança de falta de Zico que se tornou sua marca registrada.',
    rarity: 'Rare',
    price: '5.0',
    stats: {
      'Precisão': '96',
      'Técnica': '94',
      'Impacto': '85'
    }
  }
];

export const Dashboard = () => {
  const [filter, setFilter] = useState<'all' | 'Legendary' | 'Epic' | 'Rare'>('all');
  const navigate = useNavigate();

  const handleBuyNFT = (nft: NFT) => {
    alert(`Iniciando compra do NFT: ${nft.name} por ${nft.price} ETH`);
  };

  const handleGetFreePack = () => {
    navigate('/register');
  };

  const filteredNFTs = filter === 'all' 
    ? mockNFTs 
    : mockNFTs.filter(nft => nft.rarity === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="container mx-auto px-4 py-12 space-y-24">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Coluna da esquerda - Texto e CTA */}
          <div className="space-y-8">
            <h1 className="text-6xl font-bold text-white leading-tight">
              MOMENTOS
              <br />
              ETERNIZADOS
            </h1>
            <p className="text-xl text-gray-300">
              Colecione os momentos mais icônicos do futebol mundial em NFTs únicos
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Timer initialMinutes={4} initialSeconds={25} />
                <span className="text-gray-400 font-medium">OFERTA POR TEMPO LIMITADO</span>
              </div>
              <button 
                onClick={handleGetFreePack}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
              >
                OBTENHA SEU PACOTE GRÁTIS
              </button>
            </div>
          </div>

          {/* Coluna da direita - Preview do NFT */}
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl">
              <img
                className="w-full h-full object-cover"
                src="https://media1.tenor.com/m/LdFFy9ZkTy8AAAAd/neymar-puska.gif"
                alt="Gol do Neymar - Prêmio Puskás 2011"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-75 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaTrophy className="w-8 h-8 text-yellow-500" />
                  <div>
                    <h3 className="text-white font-bold">Prêmio Puskás 2011</h3>
                    <p className="text-gray-300 text-sm">
                      O gol mais bonito do mundo: Neymar pelo Santos contra o Flamengo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rare NFTs Carousel */}
        <div className="py-12">
          <RareNFTCarousel />
        </div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/collections" 
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 to-blue-700 p-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="relative flex items-center space-x-4 bg-gray-900 p-6 rounded-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600/20 text-purple-400 transition-colors group-hover:bg-purple-600/30 group-hover:text-purple-300">
                <FaLayerGroup className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Coleções</h3>
                <p className="text-sm text-gray-300">Explore suas coleções de NFTs</p>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-300 group-hover:translate-x-2">
                →
              </div>
            </div>
          </Link>

          <Link 
            to="/marketplace" 
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 to-blue-600 p-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="relative flex items-center space-x-4 bg-gray-900 p-6 rounded-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600/20 text-green-400 transition-colors group-hover:bg-green-600/30 group-hover:text-green-300">
                <FaStore className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Marketplace</h3>
                <p className="text-sm text-gray-300">Compre e venda NFTs</p>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-300 group-hover:translate-x-2">
                →
              </div>
            </div>
          </Link>

          <Link 
            to="/games" 
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-orange-600 p-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="relative flex items-center space-x-4 bg-gray-900 p-6 rounded-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-600/20 text-red-400 transition-colors group-hover:bg-red-600/30 group-hover:text-red-300">
                <FaGamepad className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Games</h3>
                <p className="text-sm text-gray-300">Jogue com seus NFTs</p>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-300 group-hover:translate-x-2">
                →
              </div>
            </div>
          </Link>
        </div>

        {/* Live Minting Section */}
        <div className="text-center space-y-16">
          <h2 className="text-5xl font-bold text-white">
            MINT AO VIVO NO ESTÁDIO
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl backdrop-blur-sm space-y-4">
              <div className="text-blue-400 text-4xl flex justify-center">
                <FaFootballBall />
              </div>
              <h3 className="text-xl font-bold text-white">Vá ao Estádio</h3>
              <p className="text-gray-300">
                Compareça aos jogos do Brasileirão e tenha acesso exclusivo aos NFTs dos melhores momentos
              </p>
            </div>

            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl backdrop-blur-sm space-y-4">
              <div className="text-blue-400 text-4xl flex justify-center">
                <FaMobile />
              </div>
              <h3 className="text-xl font-bold text-white">Abra o App</h3>
              <p className="text-gray-300">
                Use nosso app para escanear o QR code disponível nas áreas VIP do estádio
              </p>
            </div>

            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl backdrop-blur-sm space-y-4">
              <div className="text-blue-400 text-4xl flex justify-center">
                <FaQrcode />
              </div>
              <h3 className="text-xl font-bold text-white">Faça o Mint</h3>
              <p className="text-gray-300">
                Garanta seu NFT exclusivo do momento que você presenciou ao vivo
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Benefícios Exclusivos
            </h3>
            <ul className="text-left text-gray-100 space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                Acesso antecipado aos mints de momentos especiais
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                Descontos em ingressos para próximos jogos
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                Encontros exclusivos com jogadores
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                Participação em sorteios de camisas autografadas
              </li>
            </ul>
          </div>
        </div>

        {/* Seção de NFTs */}
        <section className="py-12 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              Momentos Históricos Disponíveis
            </h2>
            <VerticalNFTCarousel
              nfts={nfts}
              onBuy={(nft) => {
                // Implementar lógica de compra
                console.log('Comprando NFT:', nft);
              }}
            />
          </div>
        </section>

        {/* Mystery Packs Section */}
        <div className="space-y-12 py-16">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-white">
              PACKS MISTERIOSOS
            </h2>
            <p className="text-xl text-gray-300">
              Abra packs e descubra momentos históricos do futebol brasileiro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pack Básico */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gray-900 ring-1 ring-gray-700 rounded-2xl px-8 py-12 space-y-6 hover:ring-green-500 transition-all duration-300">
                <div className="flex justify-center">
                  <div className="rounded-full bg-green-600/20 p-4">
                    <FaStar className="h-12 w-12 text-green-500" />
                  </div>
                </div>
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-white">Pack Básico</h3>
                  <div className="text-5xl font-bold text-white">
                    0.1 ETH
                  </div>
                  <p className="text-gray-400">3 momentos aleatórios</p>
                </div>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    70% chance de Rare
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    25% chance de Epic
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    5% chance de Legendary
                  </li>
                </ul>
                <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity">
                  COMPRAR PACK
                </button>
              </div>
            </div>

            {/* Pack Premium */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gray-900 ring-1 ring-gray-700 rounded-2xl px-8 py-12 space-y-6 hover:ring-purple-500 transition-all duration-300">
                <div className="flex justify-center">
                  <div className="rounded-full bg-purple-600/20 p-4">
                    <FaGem className="h-12 w-12 text-purple-500" />
                  </div>
                </div>
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-white">Pack Premium</h3>
                  <div className="text-5xl font-bold text-white">
                    0.3 ETH
                  </div>
                  <p className="text-gray-400">5 momentos aleatórios</p>
                </div>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    50% chance de Rare
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    35% chance de Epic
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    15% chance de Legendary
                  </li>
                </ul>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity">
                  COMPRAR PACK
                </button>
              </div>
            </div>

            {/* Pack Lendário */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-red-600 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gray-900 ring-1 ring-gray-700 rounded-2xl px-8 py-12 space-y-6 hover:ring-yellow-500 transition-all duration-300">
                <div className="flex justify-center">
                  <div className="rounded-full bg-yellow-600/20 p-4">
                    <FaCrown className="h-12 w-12 text-yellow-500" />
                  </div>
                </div>
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-white">Pack Lendário</h3>
                  <div className="text-5xl font-bold text-white">
                    1.0 ETH
                  </div>
                  <p className="text-gray-400">10 momentos aleatórios</p>
                </div>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    30% chance de Rare
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    45% chance de Epic
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    25% chance de Legendary
                  </li>
                </ul>
                <button className="w-full bg-gradient-to-r from-yellow-600 to-red-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity">
                  COMPRAR PACK
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto bg-gray-800 bg-opacity-50 p-8 rounded-2xl backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              Informações Importantes
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Cada pack contém momentos únicos do futebol brasileiro
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Os momentos são selecionados aleatoriamente de acordo com as probabilidades
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Quanto mais raro o pack, maiores as chances de momentos lendários
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Todos os momentos são tokens não fungíveis (NFTs) na blockchain
              </li>
            </ul>
          </div>

          {/* Recent Reveals Section */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-2">Últimas Revelações</h3>
              <p className="text-gray-300">Veja o que outros colecionadores estão descobrindo</p>
            </div>

            <div className="grid gap-6">
              {recentReveals.map((reveal) => (
                <div 
                  key={reveal.id}
                  className="bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                        <FaBox className="text-blue-400" />
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm">{reveal.user}</p>
                        <p className="text-blue-400 font-medium">{reveal.packType}</p>
                      </div>
                    </div>
                    <span className="text-gray-400 text-sm">{reveal.timestamp}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reveal.nfts.map((nft, index) => (
                      <div 
                        key={index}
                        className="bg-gray-900 rounded-lg p-4 flex items-center space-x-4"
                      >
                        <div className="w-16 h-16 rounded-lg bg-gray-800 overflow-hidden">
                          <img 
                            src={nft.image} 
                            alt={nft.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{nft.name}</h4>
                          <span className={`text-sm ${
                            nft.rarity === 'Legendary' ? 'text-yellow-500' :
                            nft.rarity === 'Epic' ? 'text-purple-500' :
                            'text-blue-500'
                          }`}>
                            {nft.rarity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                      Ver detalhes →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 