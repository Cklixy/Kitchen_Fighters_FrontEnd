/* src/pages/ChefsPage.jsx */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/chefs.css';
import '../css/forms.css'; // <-- ¡¡AÑADIDO!! Para el estilo de .search-bar

const API_URL = 'http://localhost:5000';
const defaultProfilePic = 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png';

const ChefsPage = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // <-- ¡¡AÑADIDO!!

  const fetchChefs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/chefs`); 
      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo obtener la lista de chefs`);
      }
      const data = await response.json();
      setChefs(data);
    } catch (err) {
      console.error('Error al cargar chefs:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error desconocido.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChefs();
  }, []); 

  // --- ¡¡AÑADIDO!!: Lógica de filtrado ---
  const filteredChefs = chefs.filter(chef => {
    // Aseguramos que los campos existan antes de buscar
    const name = chef.name || '';
    const specialty = chef.specialty || '';
    const experience = (chef.experienceYears || '').toString();
    
    const term = searchTerm.toLowerCase();
    
    // Buscamos en nombre, especialidad O años de experiencia
    return name.toLowerCase().includes(term) ||
           specialty.toLowerCase().includes(term) ||
           experience.includes(term);
  });
  // --- FIN DE LÓGICA ---

  const renderContent = () => {
    if (loading) {
      return <p className="loading-message">Cargando chefs...</p>;
    }

    if (error) {
      return <p className="error-message">Error al cargar chefs: {error}</p>;
    }

    // --- ¡¡MODIFICADO!!: Usamos filteredChefs y un mensaje dinámico ---
    if (filteredChefs.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: '#aaa' }}>
            {searchTerm
              ? `No se encontraron chefs con "${searchTerm}"`
              : 'No hay chefs registrados todavía.'
            }
          </p>
        </div>
      );
    }
    // --- FIN DE MODIFICACIÓN ---

    return (
      <div className="chefs-list">
        {/* ¡¡MODIFICADO!!: Mapeamos sobre filteredChefs */}
        {filteredChefs.map((chef) => {
          const imageUrl = chef.profileImageUrl 
            ? `${API_URL}/${chef.profileImageUrl}` 
            : defaultProfilePic;

          // Tu JSX original (sin cambios)
          return (
            <div key={chef._id} className="chef-card">
              <img 
                src={imageUrl} 
                alt={chef.name} 
                className="chef-card-img" 
                onError={(e) => { e.target.onerror = null; e.target.src = defaultProfilePic; }}
              />
              
              <h3>{chef.name}</h3>

              <p>
                <strong>Especialidad:</strong> {chef.specialty}
              </p>
              
              <p>
                <strong>Experiencia:</strong> {chef.experienceYears} años
              </p>
              
              <Link to={`/chefs/${chef._id}`} className="details-link">
                Ver Perfil
              </Link>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="chefs-page-container">
      <div className="page-header">
        <h1>Conoce a los Chefs</h1>
      </div>
      
      {/* --- ¡¡AÑADIDO!!: Barra de Búsqueda --- */}
      <input
        type="text"
        className="search-bar"
        placeholder="Buscar por nombre, especialidad o experiencia..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* --- FIN DE BARRA DE BÚSQUEDA --- */}

      {renderContent()}
    </div>
  );
};

export default ChefsPage;