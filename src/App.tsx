import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PrivateRoute } from './components/PrivateRoute';
import { PublicRoute } from './components/PublicRoute';
import '@rainbow-me/rainbowkit/styles.css';
import './styles/fonts.css';

// Componentes temporários para as novas rotas
const Collections = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-white mb-8">Minhas Coleções</h1>
    <div className="text-gray-300">Em desenvolvimento...</div>
  </div>
);

const Marketplace = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-white mb-8">Marketplace</h1>
    <div className="text-gray-300">Em desenvolvimento...</div>
  </div>
);

const Games = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-white mb-8">Jogos</h1>
    <div className="text-gray-300">Em desenvolvimento...</div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-900">
          <Routes>
            <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/collections" element={<PrivateRoute><Collections /></PrivateRoute>} />
            <Route path="/marketplace" element={<PrivateRoute><Marketplace /></PrivateRoute>} />
            <Route path="/games" element={<PrivateRoute><Games /></PrivateRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App; 