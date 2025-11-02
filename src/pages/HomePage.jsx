import React from 'react';
import { Link } from 'react-router-dom';
import '../css/homepage.css'; 

function HomePage() {
  return (
    <div className="homepage-wrapper">
      <section className="home-section hero-section">
        <h2 className="home-hook">¿Eres chef y te gusta competir?</h2>
        <h1 className="home-title">Kitchen Fighters</h1>
        <p className="home-description">
          La arena digital para la gestión y participación en torneos de cocina.
          Registra chefs, crea eventos y sigue el ranking en tiempo real.
        </p>
        <div className="home-cta-buttons">
          <Link to="/tournaments" className="glass-button-primary">
            Explorar Torneos
          </Link>
          <Link to="/chefs/register" className="glass-button-secondary">
            Registrarme como Chef
          </Link>
        </div>
      </section>

      <section className="home-section">
        <h2 className="section-title">La Cocina es Nuestra Arena</h2>
        <p className="section-subtitle">
          Kitchen Fighters nació de la pasión por la gastronomía y la emoción de la competencia. 
          Creemos que cada plato cuenta una historia y que el talento merece ser reconocido. 
          Nuestra plataforma elimina la burocracia para que puedas centrarte en lo que importa: la comida.
        </p>
      </section>

      <section className="home-section">
        <h2 className="section-title">¿Cómo funciona?</h2>
        <div className="features-grid">
          <div className="star-border-card">
            <span className="feature-icon">👩‍🍳</span>
            <h3>1. Registra Chefs</h3>
            <p>Crea perfiles para todos tus chefs, con su especialidad y años de experiencia.</p>
          </div>
          
          <div className="star-border-card">
            <span className="feature-icon">🏆</span>
            <h3>2. Crea Torneos</h3>
            <p>Define tus eventos, ubicaciones y el número máximo de participantes.</p>
          </div>
          
          <div className="star-border-card">
            <span className="feature-icon">💯</span>
            <h3>3. Sigue la Puntuación</h3>
            <p>Inscribe chefs a los torneos y actualiza sus puntuaciones en vivo (0-100).</p>
          </div>
          
          <div className="star-border-card">
            <span className="feature-icon">📊</span>
            <h3>4. Ranking en Vivo</h3>
            <p>Consulta el ranking final de cualquier torneo, ordenado por el puntaje más alto.</p>
          </div>
          
        </div>
      </section>

      <section className="home-section">
        <h2 className="section-title">Lo que dicen los jueces</h2>
        <div className="testimonial-card star-border-card">
            <blockquote>
              "Nunca ha sido tan fácil organizar una competencia. La gestión de puntajes en 
              tiempo real es impecable. Kitchen Fighters ha elevado el nivel de nuestros eventos."
            </blockquote>
            <cite>– Chef Ana Morales, Jueza Internacional</cite>
         </div>
      </section>

      <section className="home-section cta-section">
        <h2>Todo listo para competir.</h2>
        <p className="section-subtitle">Explora los torneos que están activos ahora mismo.</p>
        <Link to="/tournaments" className="glass-button-primary btn-large">
          Explorar Torneos Abiertos
        </Link>
      </section>

      <footer className="home-footer">
        <p>© 2025 Kitchen Fighters. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default HomePage;