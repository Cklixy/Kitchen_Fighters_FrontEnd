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
import ChefDetailPage from './pages/ChefDetailPage';
import AdminRoute from './components/AdminRoute';
import AdminPage from './pages/AdminPage';

// --- ¡¡INICIO DE CÓDIGO AÑADIDO!! ---
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
// --- FIN DEL CÓDIGO AÑADIDO ---

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
            <Route path="/chefs/:id" element={<ChefDetailPage />} />
            
            <Route path="/chefs/register" element={<RegisterChefPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* --- ¡¡NUEVAS RUTAS AÑADIDAS!! --- */}
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            {/* --- FIN DE RUTAS AÑADIDAS --- */}

            {/* --- Rutas Protegidas (Solo Admin) --- */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>

            {/* --- Rutas Protegidas (Usuarios logueados) --- */}
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