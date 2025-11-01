import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import '../css/tournament-detail.css'; 

const API_URL = 'http://localhost:5000';

const TournamentDetailPage = () => {
  const { id } = useParams();

  // Estados del torneo
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Nuevos estados para el login y el registro
  const [loggedInChef, setLoggedInChef] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(null);

  // 2. Extraemos la función de fetch para poder reutilizarla
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

  // 3. useEffect para cargar datos del torneo y del chef logueado
  useEffect(() => {
    // Carga los datos del torneo
    fetchTournament();

    // Revisa si hay un chef logueado en localStorage
    const storedChef = localStorage.getItem('chef');
    if (storedChef && storedChef !== 'undefined') {
      try {
        setLoggedInChef(JSON.parse(storedChef));
      } catch (e) {
        console.error('Error al parsear datos del chef:', e);
        localStorage.removeItem('chef');
      }
    }
  }, [fetchTournament]); // Se ejecuta una vez al montar

  // 4. Nueva función para manejar la inscripción
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
      // 5. Llamamos al endpoint protegido. No necesitamos enviar body.
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

      // 6. Éxito: Mostramos mensaje y actualizamos el torneo
      setRegisterSuccess('¡Inscrito exitosamente!');
      setTournament(data); // Actualizamos el estado con el torneo que devuelve el backend

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


  // 7. Lógica de renderizado
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

  // 8. Verificamos si el chef logueado ya está inscrito
  const isAlreadyRegistered = loggedInChef && tournament.participants.some(
    p => p._id === loggedInChef._id
  );

  return (
    <div className="detail-page-container">
      
      {/* --- CABECERA --- */}
      <header className="detail-header">
        <h1>{tournament.name}</h1>
        <div className="detail-info">
          <p>
            <strong>Inicio:</strong>
            {displayDate ? new Date(displayDate).toLocaleDateString() : 'Por definir'}
          </p>
          <p>
            <strong>Inscritos:</strong>
            {tournament.participants?.length || 0} / 16
          </p>
        </div>
      </header>

      {/* --- (NUEVO) BLOQUE DE INSCRIPCIÓN --- */}
      {loggedInChef && (
        <div className="registration-box">
          {(() => {
            // Caso 1: El torneo ya no está 'Pendiente'
            if (tournament.estado !== 'Pendiente') {
              return <p className="success-message">Las inscripciones para este torneo están cerradas.</p>;
            }
            // Caso 2: Ya está inscrito
            if (isAlreadyRegistered) {
              return <p className="success-message">¡Ya estás inscrito en este torneo!</p>;
            }
            // Caso 3: Inscripción exitosa (oculta el botón)
            if (registerSuccess) {
              return <p className="success-message">{registerSuccess}</p>;
            }
            // Caso 4: Botón para inscribirse
            return (
              <>
                <button 
                  onClick={handleRegister} 
                  disabled={isSubmitting} 
                  className="btn-register"
                >
                  {isSubmitting ? 'Inscribiendo...' : '¡Inscribirme a este torneo!'}
                </button>
                {registerError && <p className="error-message">{registerError}</p>}
              </>
            );
          })()}
        </div>
      )}

      {/* --- COLUMNAS (Sin cambios) --- */}
      <div className="detail-columns">
        <div className="column-card">
          <h2>Participantes ({tournament.participants?.length || 0})</h2>
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