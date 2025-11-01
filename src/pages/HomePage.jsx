import React from 'react';
import { Link } from 'react-router-dom';
// Asegúrate de que la ruta a tu CSS sea la correcta
import '../css/homepage.css'; 

function HomePage() {
  return (
    <div className="homepage-wrapper">
      
      {/* --- SECCIÓN 1: EL GANCHO (HERO) --- */}
      <section className="home-container hero-section">
        
        {/* Este es el gancho que propusiste */}
        <h2 className="home-hook">¿Eres chef y te gusta competir?</h2>
        
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
      </section>

      {/* --- SECCIÓN 2: CARACTERÍSTICAS PRINCIPALES --- */}
      <section className="features-section">
        <h2 className="section-title">¿Cómo funciona?</h2>
        <div className="features-grid">
          
          <div className="feature-card">
            <span className="feature-icon">👩‍🍳</span>
            <h3>1. Registra Chefs</h3>
            <p>Crea perfiles para todos tus chefs, con su especialidad y años de experiencia.</p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">🏆</span>
            <h3>2. Crea Torneos</h3>
            <p>Define tus eventos, ubicaciones y el número máximo de participantes.</p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">💯</span>
            <h3>3. Sigue la Puntuación</h3>
            <p>Inscribe chefs a los torneos y actualiza sus puntuaciones en vivo (0-100).</p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">📊</span>
            <h3>4. Ranking en Vivo</h3>
            <p>Consulta el ranking final de cualquier torneo, ordenado por el puntaje más alto.</p>
          </div>
          
        </div>
      </section>

      {/* --- SECCIÓN 3: LLAMADA A LA ACCIÓN FINAL (CTA) --- */}
      <section className="cta-section">
        <h2>Todo listo para competir.</h2>
        <p>Explora los torneos que están activos ahora mismo.</p>
        <Link to="/tournaments" className="btn btn-primary btn-large">
          Explorar Torneos Abiertos
        </Link>
      </section>

      {/* --- FOOTER --- */}
      <footer className="home-footer">
        <p>© 2025 Kitchen Fighters. Todos los derechos reservados.</p>
      </footer>
      
    </div>
  );
}

export default HomePage;