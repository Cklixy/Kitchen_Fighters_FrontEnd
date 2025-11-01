import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TournamentsListPage from './pages/TournamentsListPage';
import ChefsPage from './pages/ChefsPage';
import TournamentDetailPage from './pages/TournamentDetailPage';
import RegisterChefPage from './pages/RegisterChefPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';

// 1. IMPORTAMOS LA NUEVA PÁGINA
import ChefDetailPage from './pages/ChefDetailPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main style={{ padding: '2rem' }}>
          <Routes>
            {/* --- Rutas Públicas --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/tournaments" element={<TournamentsListPage />} />
            <Route path="/tournaments/:id" element={<TournamentDetailPage />} />
            
            <Route path="/chefs" element={<ChefsPage />} />
            {/* 2. AÑADIMOS LA NUEVA RUTA PÚBLICA DE DETALLE */}
            <Route path="/chefs/:id" element={<ChefDetailPage />} />
            
            <Route path="/chefs/register" element={<RegisterChefPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* --- Rutas Protegidas --- */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;