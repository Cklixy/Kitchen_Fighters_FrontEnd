/* src/pages/TournamentsListPage.jsx */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/tournaments.css';
import '../css/forms.css'; // <-- ¡¡AÑADIDO!! Importa los estilos

const getStatusClass = (status) => {
  if (!status) return 'status-Pendiente';
  return `status-${status.replace(/\s+/g, '-')}`;
};

const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // <-- ¡¡AÑADIDO!!

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

  // --- ¡¡AÑADIDO!!: Lógica de filtrado ---
  const filteredTournaments = tournaments.filter(tournament =>
    tournament.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // --- FIN DE LÓGICA ---

  const renderContent = () => {
    if (loading) {
      return <p className="loading-message">Cargando torneos...</p>;
    }
    
    if (error) {
      return <p className="error-message">Error al cargar torneos: {error}</p>;
    }

    if (filteredTournaments.length === 0) { // <-- Modificado
      return (
        <p className="loading-message" style={{ color: '#aaa' }}>
          No se encontraron torneos{searchTerm ? ` con el nombre "${searchTerm}"` : ' disponibles'}.
        </p>
      );
    }

    return (
      <div className="tournaments-list">
        {/* ¡¡MODIFICADO!!: Usamos 'filteredTournaments' */}
        {filteredTournaments
          .filter(tournament => tournament && tournament._id) 
          .map((tournament) => {
            const displayDate = tournament.inicio || tournament.startDate;
            const imageUrl = tournament.imageUrl 
              ? `http://localhost:5000${tournament.imageUrl}` 
              : null;
            
            const estado = tournament.estado || 'Pendiente';
            const estadoClass = getStatusClass(estado);
            const estadoTexto = estado === 'Inscripción' ? 'Inscripción Abierta' : estado;

            return (
              <div key={tournament._id} className="tournament-card">
                <div className={`tournament-card-status ${estadoClass}`}>
                  {estadoTexto}
                </div>
                
                {imageUrl && (
                  <img 
                    src={imageUrl} 
                    alt={tournament.name} 
                    className="tournament-card-image" 
                  />
                )}
                
                <div className="tournament-card-content">
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
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <div className="tournaments-page-container">
      <h1>Próximos Torneos</h1>
      
      {/* --- ¡¡AÑADIDO!!: Barra de Búsqueda --- */}
      <input
        type="text"
        className="search-bar"
        placeholder="Buscar torneo por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {renderContent()}
    </div>
  );
};

export default TournamentsPage;