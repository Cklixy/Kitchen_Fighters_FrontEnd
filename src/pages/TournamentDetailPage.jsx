/* src/pages/TournamentDetailPage.jsx */

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import '../css/tournament-detail.css'; 

const API_URL = 'http://localhost:5000';

const getStatusClass = (status) => {
  if (!status) return 'status-Pendiente'; // <-- Default a Pendiente
  return `status-${status.replace(/\s+/g, '-')}`;
};

const TournamentDetailPage = () => {
  const { id } = useParams();

  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [loggedInChef, setLoggedInChef] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(null);

  const fetchTournament = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/tournaments/${id}`);
      
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || `Error ${response.status}: No se pudo obtener el torneo`);
      }
      
      const data = await response.json();
      setTournament(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error desconocido.');
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTournament();

    const storedChef = localStorage.getItem('chef');
    if (storedChef && storedChef !== 'undefined') {
      try {
        setLoggedInChef(JSON.parse(storedChef));
      } catch (e) {
        console.error('Error al parsear datos del chef:', e);
        localStorage.removeItem('chef');
      }
    }
  }, [fetchTournament]);

  const handleRegister = async () => {
    setIsSubmitting(true);
    setRegisterError(null);
    setRegisterSuccess(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setRegisterError('Debes iniciar sesión para inscribirte.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/tournaments/${id}/register`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al inscribirse');
      }

      setRegisterSuccess('¡Inscrito exitosamente!');
      setTournament(data); 

    } catch (err) {
      if (err instanceof Error) {
        setRegisterError(err.message);
      } else {
        setRegisterError('Ocurrió un error desconocido.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  if (loading) {
    return <p className="loading-message">Cargando detalles del torneo...</p>;
  }

  if (error) {
    return <p className="error-message">Error al cargar torneo: {error}</p>;
  }

  if (!tournament) {
    return <p>Torneo no encontrado.</p>;
  }

  const sortedResults = tournament.results
    ? [...tournament.results].sort((a, b) => b.score - a.score)
    : [];
  
  const displayDate = tournament.inicio || tournament.startDate;

  const isAlreadyRegistered = loggedInChef && tournament.participants.some(
    p => p._id === loggedInChef._id
  );

  const maxP = tournament.maxParticipants || 16;
  const participantsCount = tournament.participants?.length || 0;
  const isFull = participantsCount >= maxP;

  // --- ¡¡LÓGICA DE ESTADO MODIFICADA!! ---
  const imageUrl = tournament.imageUrl 
    ? `${API_URL}${tournament.imageUrl}` 
    : null;
  
  const estado = tournament.estado || 'Pendiente';
  const estadoClass = getStatusClass(estado);
  const estadoTexto = estado === 'Inscripción' ? 'Inscripción Abierta' : estado;
  // --- FIN DE LÓGICA ---

  return (
    <div className="detail-page-container">
      
      {/* --- CABECERA MODIFICADA --- */}
      <header className="detail-header">
        
        {imageUrl && (
          <img src={imageUrl} alt={tournament.name} className="detail-header-image" />
        )}

        <div className="detail-header-content">
          <h1>{tournament.name}</h1>
          <div className="detail-info">
            <p>
              <strong>Inicio:</strong>
              {displayDate ? new Date(displayDate).toLocaleDateString() : 'Por definir'}
            </p>
            <p>
              <strong>Inscritos:</strong>
              {participantsCount} / {maxP}
            </p>
            <p>
              <strong>Estado:</strong>
              <span className={`status ${estadoClass}`}>{estadoTexto}</span>
            </p>
          </div>
        </div>
      </header>
      
      {tournament.description && tournament.description !== 'No hay descripción para este torneo.' && (
        <div className="registration-box description-box" style={{textAlign: 'left'}}>
          <h3 style={{marginTop: 0, marginBottom: '0.5rem'}}>Descripción del Torneo</h3>
          <p style={{marginTop: 0, whiteSpace: 'pre-wrap'}}>
            {tournament.description}
          </p>
        </div>
      )}

      {/* --- BLOQUE DE INSCRIPCIÓN (LÓGICA MODIFICADA) --- */}
      {loggedInChef && (
        <div className="registration-box">
          {(() => {
            if (tournament.estado !== 'Inscripción') {
              if (tournament.estado === 'Pendiente') {
                 return <p className="success-message">Las inscripciones para este torneo aún no han abierto.</p>;
              }
              return <p className="success-message">Las inscripciones para este torneo están cerradas.</p>;
            }
            if (isFull && !isAlreadyRegistered) {
              return <p className="success-message">Este torneo ya ha alcanzado el máximo de {maxP} participantes.</p>;
            }
            if (isAlreadyRegistered) {
              return <p className="success-message">¡Ya estás inscrito en este torneo!</p>;
            }
            if (registerSuccess) {
              return <p className="success-message">{registerSuccess}</p>;
            }
            return (
              <>
                <button 
                  onClick={handleRegister} 
                  disabled={isSubmitting} 
                  className="btn-register"
                >
                  {isSubmitting ? 'Inscribiendo...' : '¡Inscribirme a este torneo!'}
                </button>
                {registerError && <p className="error-message" style={{marginTop: '1rem'}}>{registerError}</p>}
              </>
            );
          })()}
        </div>
      )}

      {/* --- COLUMNAS (SIN CAMBIOS) --- */}
      <div className="detail-columns">
        <div className="column-card">
          <h2>Participantes ({participantsCount})</h2>
          {tournament.participants && tournament.participants.length > 0 ? (
            <ul className="participant-list">
              {tournament.participants.map((chef) => (
                <li key={chef._id} className="participant-item">
                  <div className="participant-info">
                    {chef.name}
                    <br />
                    <span>{chef.specialty}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-list-message">Aún no hay chefs inscritos.</p>
          )}
        </div>

        <div className="column-card">
          <h2>Ranking (Resultados)</h2>
          {sortedResults.length > 0 ? (
            <ol className="ranking-list">
              {sortedResults.map((result, index) => (
                <li key={result.chef._id} className="ranking-item">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="ranking-position">#{index + 1}</span>
                    <div className="participant-info">
                      {result.chef.name}
                      <br />
                      <span>{result.chef.specialty}</span>
                    </div>
                  </div>
                  <span className="ranking-score">{result.score} pts</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="empty-list-message">
              {tournament.results && tournament.results.length === 0
                ? 'Aún no se han registrado puntajes.'
                : 'El torneo aún no ha comenzado.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentDetailPage;