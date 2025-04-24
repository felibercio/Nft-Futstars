import React from 'react';
import { FaGoogle, FaApple, FaEthereum } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const { connectWallet } = useAuth();

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    // Implementar integração com login social
    console.log(`Login com ${provider}`);
  };

  const handleWalletConnect = async () => {
    try {
      await connectWallet();
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao conectar wallet:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-2">Bem-vindo ao FutStar</h2>
          <p className="text-gray-300">
            Conecte-se para receber seu pack gratuito de NFTs do futebol brasileiro
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-2xl shadow-xl space-y-6">
          <div className="space-y-4">
            <button
              onClick={() => handleSocialLogin('google')}
              className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-xl transition-colors"
            >
              <FaGoogle className="w-5 h-5" />
              <span>Continuar com Google</span>
            </button>

            <button
              onClick={() => handleSocialLogin('apple')}
              className="w-full flex items-center justify-center space-x-3 bg-black hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-xl transition-colors"
            >
              <FaApple className="w-5 h-5" />
              <span>Continuar com Apple</span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 bg-opacity-50 text-gray-400">ou</span>
              </div>
            </div>

            <button
              onClick={handleWalletConnect}
              className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-medium py-3 px-4 rounded-xl transition-all"
            >
              <FaEthereum className="w-5 h-5" />
              <span>Conectar Carteira</span>
            </button>
          </div>

          <div className="text-center text-sm text-gray-400">
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

        <div className="text-center text-gray-400 text-sm">
          <p>
            Já tem uma conta?{' '}
            <button onClick={() => navigate('/dashboard')} className="text-blue-400 hover:text-blue-300 font-medium">
              Fazer login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}; 