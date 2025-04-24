import React, { useState } from 'react';
import { FaGoogle, FaApple, FaGift, FaTrophy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// NFT gratuito para novos usuários
const freeNFT = {
  name: "Neymar - Gol Puskás 2011",
  image: "https://media.tenor.com/neymar-puskas-2011.gif",
  rarity: "Rare",
  description: "Gol histórico de Neymar pelo Santos contra o Flamengo, vencedor do Prêmio Puskás de 2011"
};

export const Register = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [showNFTReward, setShowNFTReward] = useState(false);

  const handleSocialRegister = async (provider: 'google' | 'apple') => {
    try {
      setIsRegistering(true);
      // Simular registro
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowNFTReward(true);
    } catch (error) {
      console.error(`Erro no registro com ${provider}:`, error);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleClaimNFT = () => {
    navigate('/dashboard');
  };

  if (showNFTReward) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-2xl shadow-xl space-y-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <FaGift className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Parabéns!</h2>
              <p className="text-gray-300">
                Você ganhou seu primeiro NFT do FutStar
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 space-y-4">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img
                  src={freeNFT.image}
                  alt={freeNFT.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">{freeNFT.name}</h3>
                <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                  {freeNFT.rarity}
                </span>
                <p className="text-gray-400">{freeNFT.description}</p>
              </div>
            </div>

            <button
              onClick={handleClaimNFT}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02]"
            >
              REIVINDICAR NFT
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Vídeo do Gol como Background */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="https://media.tenor.com/neymar-santos-puskas.jpg"
          src="https://media.tenor.com/neymar-santos-puskas.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent" />
      </div>

      {/* Conteúdo do Registro */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-3 bg-black bg-opacity-75 p-4 rounded-xl mb-8">
              <FaTrophy className="w-8 h-8 text-yellow-500" />
              <div className="text-left">
                <h3 className="text-white font-bold">Prêmio Puskás 2011</h3>
                <p className="text-gray-300 text-sm">
                  Neymar - Santos vs Flamengo
                </p>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white">Ganhe um NFT Grátis!</h2>
            <p className="text-xl text-gray-300">
              Registre-se agora e ganhe um NFT exclusivo do FutStar
            </p>
          </div>

          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-2xl shadow-xl space-y-6">
            <div className="space-y-4">
              <button
                onClick={() => handleSocialRegister('google')}
                disabled={isRegistering}
                className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-100 text-gray-800 font-medium py-4 px-6 rounded-xl transition-colors disabled:opacity-50"
              >
                <FaGoogle className="w-5 h-5" />
                <span>Registrar com Google</span>
              </button>

              <button
                onClick={() => handleSocialRegister('apple')}
                disabled={isRegistering}
                className="w-full flex items-center justify-center space-x-3 bg-black hover:bg-gray-900 text-white font-medium py-4 px-6 rounded-xl transition-colors disabled:opacity-50"
              >
                <FaApple className="w-5 h-5" />
                <span>Registrar com Apple</span>
              </button>
            </div>

            <div className="text-center text-sm text-gray-300">
              <p>
                Ao continuar, você concorda com nossos{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Termos de Serviço
                </a>{' '}
                e{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Política de Privacidade
                </a>
              </p>
            </div>
          </div>

          <div className="text-center text-gray-300 text-sm">
            <p>
              Já tem uma conta?{' '}
              <button onClick={() => navigate('/login')} className="text-blue-400 hover:text-blue-300 font-medium">
                Fazer login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 