/* src/pages/AdminPage.tsx */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/forms.css'; // Para estilizar los formularios
import '../css/admin.css'; // Importamos el nuevo CSS de Admin

// --- CSS en línea ELIMINADO ---

const AdminPage = () => {
  const [chefs, setChefs] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Estados de Creación de Torneo
  const [tournamentName, setTournamentName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [description, setDescription] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [createError, setCreateError] = useState(null);
  const [createSuccess, setCreateSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Estados de Edición de Torneo
  const [editingTournament, setEditingTournament] = useState(null); 
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editError, setEditError] = useState(null);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  
  // Estados de Gestión de Resultados
  const [managingResultsFor, setManagingResultsFor] = useState(null);
  const [scores, setScores] = useState({});
  const [isSubmittingScores, setIsSubmittingScores] = useState(false);
  const [resultsError, setResultsError] = useState(null);

  const getToken = () => localStorage.getItem('token');

  // Carga inicial de datos
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const token = getToken();

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const [chefsRes, tournamentsRes] = await Promise.all([
          fetch('http://localhost:5000/api/admin/chefs', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://localhost:5000/api/admin/tournaments', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        if (!chefsRes.ok) throw new Error('No se pudieron obtener los chefs');
        if (!tournamentsRes.ok) throw new Error('No se pudieron obtener los torneos');

        const chefsData = await chefsRes.json();
        const tournamentsData = await tournamentsRes.json();

        setChefs(chefsData);
        setTournaments(tournamentsData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // --- Función para crear torneo ---
  const handleCreateTournament = async (e) => {
    e.preventDefault();
    setCreateError(null);
    setCreateSuccess(null);
    setIsSubmitting(true);
    try {
      const token = getToken();
      const participantsNum = parseInt(maxParticipants, 10);
      if (isNaN(participantsNum) || participantsNum <= 1) { 
        throw new Error('El número de participantes debe ser un número positivo mayor a 1.');
      }
      const tournamentData = {
        name: tournamentName,
        startDate,
        description,
        maxParticipants: participantsNum
      };
      const res = await fetch('http://localhost:5000/api/admin/tournaments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tournamentData)
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'No se pudo crear el torneo');
      }
      const newTournament = await res.json();
      setTournaments(prev => [newTournament, ...prev]);
      setCreateSuccess(`¡Torneo "${newTournament.name}" creado!`);
      setTournamentName('');
      setStartDate('');
      setDescription('');
      setMaxParticipants('');
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Funciones de Gestión ---
  const handleDeleteTournament = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este torneo?')) {
      return;
    }
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:5000/api/admin/tournaments/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        throw new Error('No se pudo eliminar el torneo');
      }
      setTournaments(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      setError(err.message); 
    }
  };

  // --- Funciones del Modal de Edición de Torneo ---
  const openEditModal = (tournament) => {
    setEditingTournament(tournament);
    setEditName(tournament.name);
    setEditDescription(tournament.description);
    setEditDate(new Date(tournament.startDate).toISOString().split('T')[0]);
    setEditError(null);
  };
  const closeEditModal = () => setEditingTournament(null);

  const handleUpdateTournament = async (e) => {
    e.preventDefault();
    setIsSubmittingEdit(true);
    setEditError(null);
    try {
      const token = getToken();
      const tournamentData = {};
      const originalDate = new Date(editingTournament.startDate).toISOString().split('T')[0];
      if (editName !== editingTournament.name) tournamentData.name = editName;
      if (editDescription !== editingTournament.description) tournamentData.description = editDescription;
      if (editDate !== originalDate) tournamentData.startDate = editDate;

      if (Object.keys(tournamentData).length === 0) {
        setIsSubmittingEdit(false);
        closeEditModal();
        return;
      }
      
      const res = await fetch(`http://localhost:5000/api/admin/tournaments/${editingTournament._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tournamentData) 
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'No se pudo actualizar el torneo');
      }
      const updatedTournament = await res.json();
      setTournaments(prev => 
        prev.map(t => (t._id === updatedTournament._id ? updatedTournament : t))
      );
      closeEditModal();
    } catch (err) {
      setEditError(err.message);
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  // --- Funciones del Modal de Resultados ---
  const openResultsModal = (tournament) => {
    setManagingResultsFor(tournament);
    setResultsError(null);
    const initialScores = {};
    if (tournament.participants && Array.isArray(tournament.participants)) {
      tournament.participants.forEach(participant => {
        const result = tournament.results.find(r => {
          const chefId = r.chef._id || r.chef;
          return chefId === participant._id;
        });
        initialScores[participant._id] = result ? result.score : 0;
      });
    }
    setScores(initialScores);
  };
  const closeResultsModal = () => setManagingResultsFor(null);

  const handleScoreChange = (chefId, value) => {
    let score = parseInt(value, 10);
    if (isNaN(score) || score < 0) score = 0;
    else if (score > 100) score = 100;
    setScores(prev => ({ ...prev, [chefId]: score }));
  };

  const handleSubmitResults = async (e) => {
    e.preventDefault();
    setIsSubmittingScores(true);
    setResultsError(null);

    const resultsPayload = {
      results: Object.keys(scores).map(chefId => ({
        chef: chefId,
        score: scores[chefId] || 0
      }))
    };

    try {
      const token = getToken();
      const res = await fetch(`http://localhost:5000/api/admin/tournaments/${managingResultsFor._id}/results`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resultsPayload)
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'No se pudieron guardar los resultados');
      }
      const updatedTournament = await res.json();
      setTournaments(prev => 
        prev.map(t => (t._id === updatedTournament._id ? updatedTournament : t))
      );
      closeResultsModal();
    } catch (err) {
      setResultsError(err.message);
    } finally {
      setIsSubmittingScores(false);
    }
  };

  // --- Funciones de Gestión de Chefs ---
  const handleDeleteChef = async (id, name) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar al chef "${name}"? Esta acción no se puede deshacer.`)) {
      return;
    }
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:5000/api/admin/chefs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'No se pudo eliminar al chef');
      }
      setChefs(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSetRole = async (id, newRole) => {
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:5000/api/admin/chefs/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      });
      if (!res.ok) {
        throw new Error('No se pudo actualizar el rol');
      }
      const updatedChef = await res.json();
      setChefs(prev => prev.map(c => c._id === id ? updatedChef : c));
    } catch (err) {
      setError(err.message);
    }
  };

  // --- Renderizado ---
  if (loading) return <p className="loading-message">Cargando...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <>
      <div className="admin-page-container">
        <h1 className="admin-page-title">Panel de Administrador</h1>
        
        {/* Sección de Gestión de Torneos */}
        <section className="admin-section">
          <h2>Gestionar Torneos</h2>

          <form onSubmit={handleCreateTournament} className="create-tournament-form">
            <h3 style={{ marginTop: 0 }}>Crear Nuevo Torneo</h3>
            <div className="form-group">
              <label htmlFor="tournamentName">Nombre del Torneo</label>
              <input type="text" id="tournamentName" value={tournamentName} onChange={(e) => setTournamentName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Fecha de Inicio</label>
              <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="maxParticipants">Participantes Máximos</label>
              <input type="number" id="maxParticipants" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} required min="2" />
            </div>
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creando...' : 'Crear Torneo'}
            </button>
            {createError && <p className="form-message error-message">{createError}</p>}
            {createSuccess && <p className="form-message success-message">{createSuccess}</p>}
          </form>

          <h3>Torneos Existentes ({tournaments.length})</h3>
          <ul className="admin-list">
            {tournaments.map(t => (
              <li key={t._id} className="admin-list-item">
                <span>{t.name} ({new Date(t.startDate).toLocaleDateString()})</span>
                <div className="button-group">
                  <button 
                    className="btn-admin btn-success"
                    onClick={() => openResultsModal(t)}
                    disabled={t.participants.length === 0}
                    title={t.participants.length === 0 ? "No hay participantes inscritos" : "Asignar puntuaciones"}
                  >
                    Resultados
                  </button>
                  <button 
                    className="btn-admin btn-warning"
                    onClick={() => openEditModal(t)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn-admin btn-danger"
                    onClick={() => handleDeleteTournament(t._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Sección de Gestión de Usuarios */}
        <section className="admin-section">
          <h2>Gestionar Usuarios ({chefs.length})</h2>
          <ul className="admin-list">
            {chefs.map(c => {
              const chefRole = c.role || 'user';
              return (
                <li key={c._id} className="admin-list-item">
                  <div className="item-info">
                    {c.name} ({c.email}) - <strong>Rol: {chefRole}</strong>
                  </div>
                  <div className="button-group">
                    {chefRole !== 'admin' ? (
                      <button className="btn-admin btn-warning" onClick={() => handleSetRole(c._id, 'admin')}>Hacer Admin</button>
                    ) : (
                      <button className="btn-admin btn-info" onClick={() => handleSetRole(c._id, 'user')}>Hacer User</button>
                    )}
                    <button className="btn-admin btn-danger" onClick={() => handleDeleteChef(c._id, c.name)}>Eliminar</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* --- Modal de Edición de Torneo --- */}
      {editingTournament && (
        <div className="admin-modal-backdrop" onClick={closeEditModal}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="admin-modal-close-button" onClick={closeEditModal}>&times;</button>
            <h3>Editar Torneo</h3>
            <form onSubmit={handleUpdateTournament}>
              <div className="form-group">
                <label htmlFor="editTournamentName">Nombre del Torneo</label>
                <input type="text" id="editTournamentName" value={editName} onChange={(e) => setEditName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="editStartDate">Fecha de Inicio</label>
                <input type="date" id="editStartDate" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="editDescription">Descripción</label>
                <textarea id="editDescription" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} rows="3"></textarea>
              </div>
              <button typeD="submit" className="btn-submit" disabled={isSubmittingEdit}>
                {isSubmittingEdit ? 'Actualizando...' : 'Actualizar Torneo'}
              </button>
              {editError && <p className="form-message error-message">{editError}</p>}
            </form>
          </div>
        </div>
      )}

      {/* --- Modal de Gestión de Resultados --- */}
      {managingResultsFor && (
        <div className="admin-modal-backdrop" onClick={closeResultsModal}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="admin-modal-close-button" onClick={closeResultsModal}>&times;</button>
            
            <h3>Asignar Puntuaciones: {managingResultsFor.name}</h3>
            
            <form onSubmit={handleSubmitResults}>
              <p style={{color: '#c0c0c0'}}>{managingResultsFor.participants.length} participante(s). Ingrese un valor de 0 a 100.</p>
              
              <ul className="results-list">
                {managingResultsFor.participants.map(participant => (
                  <li key={participant._id} className="results-list-item">
                    <label 
                      htmlFor={`score-${participant._id}`}
                      className="results-label"
                    >
                      {participant.name}
                    </label>
                    <input
                      type="number"
                      id={`score-${participant._id}`}
                      className="results-input"
                      min="0"
                      max="100"
                      value={scores[participant._id] || 0}
                      onChange={(e) => handleScoreChange(participant._id, e.target.value)}
                    />
                  </li>
                ))}
              </ul>
              
              <button type="submit" className="btn-submit" disabled={isSubmittingScores}>
                {isSubmittingScores ? 'Guardando...' : 'Guardar Resultados'}
              </button>
        
              {resultsError && <p className="form-message error-message">{resultsError}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPage;