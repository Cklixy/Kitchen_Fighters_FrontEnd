import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TournamentsListPage from './pages/TournamentsListPage';
import ChefsPage from './pages/ChefsPage';
import TournamentDetailPage from './pages/TournamentDetailPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tournaments" element={<TournamentsListPage />} />
        <Route path="/tournaments/:id" element={<TournamentDetailPage />} />
        <Route path="/chefs" element={<ChefsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

