import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type User = {
  address?: string;
  email?: string;
  provider: 'wallet' | 'email' | 'google' | 'apple' | null;
  freePack?: boolean;
};

type AuthContextType = {
  user: User | null;
  connectWallet: () => Promise<void>;
  connectGoogle: () => Promise<void>;
  connectApple: () => Promise<void>;
  registerWithEmail: (email: string) => Promise<void>;
  disconnect: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Usando um ID temporário para desenvolvimento
const TEMP_PROJECT_ID = "TEST_PROJECT_ID";

const config = getDefaultConfig({
  appName: 'NFT FutStar',
  projectId: TEMP_PROJECT_ID,
  chains: [mainnet, polygon],
  ssr: false,
});

const queryClient = new QueryClient();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const registerWithEmail = async (email: string) => {
    try {
      setIsLoading(true);
      // Simulando registro para teste
      setTimeout(() => {
        setUser({
          provider: 'email',
          email: email,
          freePack: true
        });
        setIsLoading(false);
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Erro ao registrar com email:', error);
      setIsLoading(false);
    }
  };

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        setUser({
          provider: 'wallet',
          address: '0x1234567890abcdef1234567890abcdef12345678',
          freePack: true
        });
        setIsLoading(false);
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
      setIsLoading(false);
    }
  };

  const connectGoogle = async () => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        setUser({
          provider: 'google',
          email: 'usuario@gmail.com',
          freePack: true
        });
        setIsLoading(false);
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Erro ao conectar com Google:', error);
      setIsLoading(false);
    }
  };

  const connectApple = async () => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        setUser({
          provider: 'apple',
          email: 'usuario@icloud.com',
          freePack: true
        });
        setIsLoading(false);
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Erro ao conectar com Apple:', error);
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider
          value={{
            user,
            connectWallet,
            connectGoogle,
            connectApple,
            registerWithEmail,
            disconnect,
            isLoading,
          }}
        >
          {children}
        </AuthContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}; 