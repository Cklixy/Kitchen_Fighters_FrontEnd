import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/tournaments.css'; //

/**
 * Página para mostrar la lista de todos los torneos.
 */
const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
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

    if (error) {
      return <p className="error-message">Error al cargar torneos: {error}</p>;
    }

    if (tournaments.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>No hay torneos disponibles en este momento.</p>
        </div>
      );
    }

    return (
      <div className="tournaments-list">
        {tournaments.map((tournament) => {
          
          // Mantenemos el arreglo para la fecha
          const displayDate = tournament.inicio || tournament.startDate;

          return (
            <div key={tournament._id} className="tournament-card">
              <h2>{tournament.name}</h2>
              
              {/* --- SECCIÓN DE ESTADO ELIMINADA --- */}
              
              <p>
                <strong>Inicio:</strong> 
                {displayDate ? new Date(displayDate).toLocaleDateString() : 'Por definir'}
              </p>
              
              <p>
                <strong>Participantes:</strong> 
                {tournament.participants?.length || 0} / 16
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