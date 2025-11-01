import React from 'react';
import { Link } from 'react-router-dom'; // Asumiendo que usas react-router-dom
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Kitchen Fighters</h1>
      </header>
      <main className="home-main">
        <p className="home-description">
          La arena digital para la gestión y participación en torneos de cocina.
          Registra chefs, crea eventos y sigue el ranking en tiempo real.
        </p>
        <div className="home-cta-buttons">
          <Link to="/tournaments" className="btn btn-primary">
            Ver Torneos
          </Link>
          <Link to="/chefs" className="btn btn-secondary">
            Gestionar Chefs
          </Link>
        </div>
      </main>
      <footer className="home-footer">
        <p>© 2025 Kitchen Fighters. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default HomePage;