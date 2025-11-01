import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TournamentsListPage from './pages/TournamentsListPage';
import ChefsPage from './pages/ChefsPage';
import TournamentDetailPage from './pages/TournamentDetailPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tournaments" element={<TournamentsListPage />} />
            <Route path="/tournaments/:id" element={<TournamentDetailPage />} />
            <Route path="/chefs" element={<ChefsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


