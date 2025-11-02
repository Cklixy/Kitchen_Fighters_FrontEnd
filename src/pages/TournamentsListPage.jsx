/* src/pages/TournamentsListPage.jsx */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/tournaments.css';
// homepage.css ya no es necesario aquí
// import '../css/homepage.css'; 

const TournamentsPage = () => {
  // ... (toda la lógica de fetch se mantiene igual) ...
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/tournaments');
        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pudo obtener la lista de torneos`);
        }
        const data = await response.json();
        setTournaments(data);
      } catch (err) {
        console.error('Error al cargar torneos:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocurrió un error desconocido. Verifica que el servidor esté corriendo en http://localhost:5000');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTournaments();
  }, []);


  const renderContent = () => {
    if (loading) {
      return <p className="loading-message">Cargando torneos...</p>;
    }
    // ... (lógica de error y vacío se mantiene igual) ...
    if (error) {
      return <p className="error-message">Error al cargar torneos: {error}</p>;
    }

    if (tournaments.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No hay torneos disponibles en este momento.</p>
        </div>
      );
    }

    return (
      <div className="tournaments-list">
        {tournaments
          .filter(tournament => tournament && tournament._id) 
          .map((tournament) => {
            const displayDate = tournament.inicio || tournament.startDate;

            return (
              // --- REQUISITO: Clase de tarjeta cambiada ---
              <div key={tournament._id} className="tournament-card">
                <h2>{tournament.name}</h2>
                
                <p>
                  <strong>Inicio:</strong> 
                  {displayDate ? new Date(displayDate).toLocaleDateString() : 'Por definir'}
                </p>
                
                <p>
                  <strong>Participantes:</strong> 
                  {tournament.participants?.length || 0} / {tournament.maxParticipants || 16}
                </p>

                <Link to={`/tournaments/${tournament._id}`} className="details-link">
                  Ver Detalles
                </Link>
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <div className="tournaments-page-container">
      <h1>Próximos Torneos</h1>
      {renderContent()}
    </div>
  );
};

export default TournamentsPage;