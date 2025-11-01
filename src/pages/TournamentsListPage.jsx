import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/tournaments.css'; // Importamos el CSS que crearemos

/**
 * Página para mostrar la lista de todos los torneos.
 */
const TournamentsPage = () => {
  // Estados para almacenar los torneos, el estado de carga y posibles errores
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. useEffect para cargar los datos de la API cuando el componente se monta
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        // Asumimos que tu backend corre en el puerto 5000
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
  }, []); // El array vacío [] asegura que esto se ejecute solo una vez (al montar)

  // 4. Renderizado condicional basado en el estado
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

    // 5. Mapeamos los torneos a tarjetas (cards)
    return (
      <div className="tournaments-list">
        {tournaments.map((tournament) => (
          <div key={tournament._id} className="tournament-card">
            <h2>{tournament.name}</h2>
            
            <p>
              <strong>Estado:</strong> 
              {/* Usamos una clase dinámica para colorear el estado */}
              <span className={`status status-${tournament.status}`}>
                {tournament.status}
              </span>
            </p>
            
            <p>
              <strong>Inicio:</strong> 
              {new Date(tournament.startDate).toLocaleDateString()}
            </p>
            
            <p>
              <strong>Participantes:</strong> 
              {tournament.participants?.length || 0} / 16
            </p>

            {/* Enlace a la página de detalles que ya tienes definida en App.jsx */}
            <Link to={`/tournaments/${tournament._id}`} className="details-link">
              Ver Detalles
            </Link>
          </div>
        ))}
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