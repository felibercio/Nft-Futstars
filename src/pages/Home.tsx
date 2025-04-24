import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaGoogle, FaApple, FaWallet, FaEnvelope, FaTrophy, FaStar, FaGem, FaCoins, FaUsers } from 'react-icons/fa';

export const Home = () => {
  const { connectWallet, connectGoogle, connectApple, isLoading, user } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [timer, setTimer] = useState({ minutes: 4, seconds: 59 });
  const [stats, setStats] = useState({
    onlineUsers: 1234,
    nftsMinted: 8976,
    totalValue: '892.45',
    rarityScore: 98
  });
  const nftCardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(current => {
        if (current.seconds > 0) {
          return { ...current, seconds: current.seconds - 1 };
        } else if (current.minutes > 0) {
          return { minutes: current.minutes - 1, seconds: 59 };
        }
        return current;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingForm(true);
    try {
      await connectGoogle(); // Simulando conexão com email por enquanto
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!nftCardRef.current) return;

    const rect = nftCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setMousePosition({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-900 flex flex-col">
      {/* Header com Stats */}
      <div className="w-full bg-black/50 backdrop-blur-sm py-4 px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-500 font-medium">
                {stats.onlineUsers.toLocaleString()} Online
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FaGem className="text-purple-500" />
              <span className="text-purple-500 font-medium">
                {stats.nftsMinted.toLocaleString()} NFTs Mintados
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <FaCoins className="text-yellow-500" />
              <span className="text-yellow-500 font-medium">
                {stats.totalValue} ETH em Volume
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-1 rounded-full">
              <FaStar className="text-yellow-500" />
              <span className="text-yellow-500 font-medium">
                Score: {stats.rarityScore}/100
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex">
        {/* Lado Esquerdo - Vídeo/GIF */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            {/* Moldura NFT Gaming com efeito 3D */}
            <div
              ref={nftCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full h-full perspective-1000 cursor-pointer"
              style={{
                transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
                transition: mousePosition.x === 0 && mousePosition.y === 0 ? 'transform 0.6s ease-out' : 'none'
              }}
            >
              {/* Bordas Decorativas */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-75 animate-pulse group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl" />
              
              {/* Container Principal */}
              <div className="relative bg-gray-900 rounded-xl p-2 h-full transform-gpu preserve-3d">
                {/* Detalhes do Canto Superior */}
                <div className="absolute top-3 left-3 z-30 flex items-center space-x-2 bg-black/70 px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-white">LEGENDARY NFT</span>
                </div>
                
                {/* Número da Edição */}
                <div className="absolute top-3 right-3 z-30 bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 rounded-full transform rotate-12 shadow-lg">
                  <div className="transform -rotate-12">
                    <span className="text-xs font-bold text-black">#</span>
                    <span className="text-lg font-black text-black">1</span>
                    <span className="text-xs font-bold text-black">/1</span>
                  </div>
                </div>

                {/* GIF do Neymar */}
                <div className="relative h-full rounded-lg overflow-hidden">
                  <img
                    src="https://media1.tenor.com/m/LdFFy9ZkTy8AAAAd/neymar-puska.gif"
                    alt="Gol do Neymar - Prêmio Puskás 2011"
                    className="w-full h-full object-cover transform-gpu"
                  />
                  
                  {/* Overlay Gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Informações do NFT */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="bg-black/70 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <FaTrophy className="w-8 h-8 text-yellow-500" />
                          <div>
                            <h3 className="text-xl font-bold text-white">Prêmio Puskás 2011</h3>
                            <p className="text-sm text-gray-300">
                              Neymar - Santos vs Flamengo
                            </p>
                          </div>
                        </div>
                        {/* Autógrafo do Neymar */}
                        <div className="transform -rotate-12">
                          <span className="font-signature text-2xl text-yellow-500 opacity-90">
                            Neymar Jr.
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-emerald-500 font-bold">VERIFIED AUTHENTIC</span>
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        </div>
                        <span className="text-blue-400">Primeira e Única Edição</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Efeitos de Canto */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500 rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-500 rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500 rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-500 rounded-br-xl" />

                {/* Selo de Autenticidade */}
                <div className="absolute -bottom-3 right-12 z-30 transform rotate-12">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full p-1">
                    <div className="bg-black rounded-full p-2">
                      <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold text-white mb-4">
                COLECIONE O QUE
                <br />
                SÓ ACONTECE
                <br />
                UMA VEZ
              </h1>
              <p className="text-2xl text-gray-300 mb-8">
                Comece com seu pacote gratuito de Estrelas do Futebol
              </p>
              
              {/* Timer */}
              <div className="flex items-center justify-center space-x-2 text-red-500 mb-8">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-mono">TEMPO LIMITADO:</span>
                <span className="font-mono">
                  {String(timer.minutes).padStart(2, '0')}m : {String(timer.seconds).padStart(2, '0')}s
                </span>
              </div>

              {/* Formulário */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu email"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoadingForm}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {isLoadingForm ? (
                    <span className="animate-spin">⚽</span>
                  ) : (
                    <>
                      <FaEnvelope />
                      <span>RECEBA SEU PACOTE GRÁTIS</span>
                    </>
                  )}
                </button>
              </form>

              <p className="mt-6 text-sm text-gray-400">
                Ao clicar em "Receba seu pacote grátis", você concorda com nossos{' '}
                <a href="/terms" className="text-blue-400 hover:underline">Termos de Serviço</a> e{' '}
                <a href="/privacy" className="text-blue-400 hover:underline">Política de Privacidade</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer com Achievements */}
      <div className="w-full bg-black/50 backdrop-blur-sm py-6 px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Achievement 1 */}
            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <FaTrophy className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold">Colecionador Lendário</h3>
                  <p className="text-gray-400 text-sm">Seja o primeiro a colecionar NFTs raros</p>
                </div>
              </div>
              <div className="mt-3 bg-black/30 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full w-0 animate-progress-75" />
              </div>
            </div>

            {/* Achievement 2 */}
            <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <FaGem className="w-6 h-6 text-yellow-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold">Caçador de Raridades</h3>
                  <p className="text-gray-400 text-sm">Desbloqueie NFTs exclusivos</p>
                </div>
              </div>
              <div className="mt-3 bg-black/30 rounded-full h-2">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full w-0 animate-progress-45" />
              </div>
            </div>

            {/* Achievement 3 */}
            <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <FaUsers className="w-6 h-6 text-green-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold">Comunidade Elite</h3>
                  <p className="text-gray-400 text-sm">Faça parte do clube exclusivo</p>
                </div>
              </div>
              <div className="mt-3 bg-black/30 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-0 animate-progress-25" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 