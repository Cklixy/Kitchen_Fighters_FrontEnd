import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/forms.css'; // ¡¡AÑADIDO!! Para estilizar el nuevo formulario

// --- (Opcional) CSS para la página de Admin ---
const adminStyles = {
  container: {
    padding: '2rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  section: {
    backgroundColor: '#f9f9f9',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem',
    borderBottom: '1px solid #eee'
  },
  button: {
    padding: '0.4rem 0.8rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    marginLeft: '0.5rem'
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white'
  },
  adminButton: {
    backgroundColor: '#f39c12',
    color: 'white'
  },
  userButton: {
    backgroundColor: '#3498db',
    color: 'white'
  }
};
// --- Fin del CSS Opcional ---

const AdminPage = () => {
  const [chefs, setChefs] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // --- (¡¡AÑADIDO!!) Estados para el formulario de creación de torneos ---
  const [tournamentName, setTournamentName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [description, setDescription] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  
  const [createError, setCreateError] = useState(null);
  const [createSuccess, setCreateSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // --- Fin de estados añadidos ---

  console.log('AdminPage - Componente montado');

  const getToken = () => localStorage.getItem('token');

  // Carga inicial de datos (chefs y torneos)
  useEffect(() => {
    console.log('AdminPage - useEffect ejecutado');
    const fetchData = async () => {
      console.log('AdminPage - fetchData iniciado');
      setLoading(true);
      setError(null);
      const token = getToken();
      console.log('AdminPage - Token:', token ? 'Presente' : 'Ausente');

      if (!token) {
        console.log('AdminPage - No hay token, redirigiendo a /login');
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

        console.log('Respuesta chefs:', chefsRes.status, chefsRes.statusText);
        console.log('Respuesta tournaments:', tournamentsRes.status, tournamentsRes.statusText);

        if (!chefsRes.ok) {
          let errorMessage = `Error ${chefsRes.status}: `;
          try {
            const errorData = await chefsRes.json();
            errorMessage += errorData.message || 'No se pudieron obtener los chefs';
            console.error('Error en chefs:', errorData);
          } catch (e) {
            if (chefsRes.status === 404) {
              errorMessage += 'Endpoint de administración no encontrado. Verifica que el backend tenga el endpoint /api/admin/chefs';
            } else {
              errorMessage += 'Error desconocido al obtener chefs';
            }
            console.error('Error al parsear respuesta de chefs:', e);
          }
          throw new Error(errorMessage);
        }

        if (!tournamentsRes.ok) {
          let errorMessage = `Error ${tournamentsRes.status}: `;
          try {
            const errorData = await tournamentsRes.json();
            errorMessage += errorData.message || 'No se pudieron obtener los torneos';
            console.error('Error en tournaments:', errorData);
          } catch (e) {
            if (tournamentsRes.status === 404) {
              errorMessage += 'Endpoint de administración no encontrado. Verifica que el backend tenga el endpoint /api/admin/tournaments';
            } else {
              errorMessage += 'Error desconocido al obtener torneos';
            }
            console.error('Error al parsear respuesta de tournaments:', e);
          }
          throw new Error(errorMessage);
        }

        const chefsData = await chefsRes.json();
        const tournamentsData = await tournamentsRes.json();

        console.log('Chefs recibidos:', chefsData);
        console.log('Tournaments recibidos:', tournamentsData);

        setChefs(chefsData);
        setTournaments(tournamentsData);

      } catch (err) {
        console.error('Error completo en fetchData:', err);
        setError(err.message || 'Error desconocido al cargar datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // --- (¡¡AÑADIDO!!) Función para crear torneo ---
  const handleCreateTournament = async (e) => {
    e.preventDefault();
    setCreateError(null);
    setCreateSuccess(null);
    setIsSubmitting(true);

    try {
      const token = getToken();
      const participantsNum = parseInt(maxParticipants, 10);

      if (isNaN(participantsNum) || participantsNum <= 1) { // Un torneo necesita al menos 2 participantes
        throw new Error('El número de participantes debe ser un número positivo mayor a 1.');
      }

      const tournamentData = {
        name: tournamentName,
        startDate,
        description,
        maxParticipants: participantsNum
      };

      // Asumimos que la creación de torneos por un admin también va a un endpoint de admin
      // Si el endpoint es /api/tournaments (público), cámbialo aquí.
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

      // Actualizar el estado local para que aparezca en la lista
      setTournaments(prev => [...prev, newTournament]);
      
      setCreateSuccess(`¡Torneo "${newTournament.name}" creado!`);
      
      // Limpiar formulario
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
  // --- Fin de la función añadida ---


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

      // Actualizar el estado local
      setTournaments(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      setError(err.message); // Puedes usar setCreateError si prefieres mostrar el error cerca del formulario
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

      // Actualizar el estado local
      setChefs(prev => prev.map(c => c._id === id ? updatedChef : c));
    } catch (err) {
      setError(err.message);
    }
  };

  // --- Renderizado ---
  
  console.log('AdminPage - Renderizando. Estado:', { loading, error, chefsCount: chefs.length, tournamentsCount: tournaments.length });

  // Renderizado forzado para debug
  if (true) {
    console.log('AdminPage - Entrando al bloque de renderizado');
  }

  if (loading) {
    console.log('AdminPage - Mostrando estado de carga');
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Cargando panel de administrador...</p>
        <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '1rem' }}>
          Esperando respuesta del servidor...
        </p>
      </div>
    );
  }

  if (error) {
    console.log('AdminPage - Mostrando error:', error);
    const is404Error = error.includes('404') || error.includes('no encontrado');
    return (
      <div style={{ padding: '2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: '#e74c3c', marginBottom: '1rem' }}>⚠️ Error al Cargar Panel de Administrador</h2>
        <p style={{ color: '#333', fontSize: '1rem', marginBottom: '1rem', lineHeight: '1.6' }}>
          <strong>{error}</strong>
        </p>
        {is404Error && (
          <div style={{ backgroundColor: '#fff3cd', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
            <p style={{ color: '#856404', margin: 0 }}>
              <strong>Nota:</strong> Los endpoints de administración no están disponibles en el backend.
              Necesitas implementar:
              <ul style={{ textAlign: 'left', marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li><code>GET /api/admin/chefs</code></li>
                <li><code>GET /api/admin/tournaments</code></li>
              </ul>
            </p>
          </div>
        )}
        <p style={{ color: '#666' }}>Por favor, verifica que el backend tenga estos endpoints implementados.</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Recargar
        </button>
      </div>
    );
  }

  console.log('AdminPage - Renderizando contenido principal');
  return (
    <>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '2rem' }}>Panel de Administrador</h1>
      <div style={adminStyles.container}>
        
        {/* --- (MODIFICADO) Sección de Gestión de Torneos --- */}
        <section style={adminStyles.section}>
          <h2>Gestionar Torneos</h2>

          {/* --- INICIO: FORMULARIO DE CREAR TORNEO AÑADIDO --- */}
          <form onSubmit={handleCreateTournament} style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #eee' }}>
            <h3 style={{ marginTop: 0 }}>Crear Nuevo Torneo</h3>
            
            <div className="form-group">
              <label htmlFor="tournamentName">Nombre del Torneo</label>
              <input
                type="text"
                id="tournamentName"
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
                required
                placeholder="Ej: Batalla Culinaria de Verano"
              />
            </div>

            <div className="form-group">
              <label htmlFor="startDate">Fecha de Inicio</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                placeholder="Breve descripción del torneo"
                // Añadimos estilo inline para que coincida con los inputs de forms.css
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="maxParticipants">Participantes Máximos</label>
              <input
                type="number"
                id="maxParticipants"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
                required
                min="2"
                placeholder="Ej: 16"
              />
            </div>
            
            <button type="submit" className="btn-submit" disabled={isSubmitting} style={{width: '100%'}}>
              {isSubmitting ? 'Creando...' : 'Crear Torneo'}
            </button>

            {createError && <p className="form-message error-message" style={{marginTop: '1rem'}}>{createError}</p>}
            {createSuccess && <p className="form-message success-message" style={{marginTop: '1rem'}}>{createSuccess}</p>}
          </form>
          {/* --- FIN: FORMULARIO DE CREAR TORNEO --- */}


          <h3>Torneos Existentes ({tournaments.length})</h3>
          {tournaments.length === 0 ? (
            <p style={{ color: '#666', fontStyle: 'italic' }}>No hay torneos registrados.</p>
          ) : (
            <ul style={adminStyles.list}>
              {tournaments.map(t => (
                <li key={t._id} style={adminStyles.listItem}>
                  <span>{t.name} ({new Date(t.startDate).toLocaleDateString()})</span>
                  <div>
                    <button 
                      style={{...adminStyles.button, ...adminStyles.deleteButton}}
                      onClick={() => handleDeleteTournament(t._id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
        {/* --- Fin de la sección modificada --- */}


        {/* Sección de Gestión de Usuarios */}
        <section style={adminStyles.section}>
          <h2>Gestionar Usuarios ({chefs.length})</h2>
          {chefs.length === 0 ? (
            <p style={{ color: '#666', fontStyle: 'italic' }}>No hay chefs registrados.</p>
          ) : (
            <ul style={adminStyles.list}>
              {chefs.map(c => {
              // Si role es undefined o null, lo tratamos como 'user'
              const chefRole = c.role || 'user';
              return (
              <li key={c._id} style={adminStyles.listItem}>
                <span>
                  {c.name} ({c.email}) - <strong>Rol: {chefRole}</strong>
                </span>
                <div>
                  {chefRole !== 'admin' ? (
                    <button 
                      style={{...adminStyles.button, ...adminStyles.adminButton}}
                      onClick={() => handleSetRole(c._id, 'admin')}
                    >
                      Hacer Admin
                    </button>
                  ) : (
                    <button 
                      style={{...adminStyles.button, ...adminStyles.userButton}}
                      onClick={() => handleSetRole(c._id, 'user')}
                    >
                      Hacer User
                    </button>
                  )}
                </div>
              </li>
            );
            })}
            </ul>
          )}
        </section>
      </div>
    </>
  );
};

export default AdminPage;