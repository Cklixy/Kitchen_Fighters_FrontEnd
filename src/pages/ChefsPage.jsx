/* src/pages/ChefsPage.jsx */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import '../css/chefs.css';
// homepage.css ya no es necesario aquí
// import '../css/homepage.css'; 

const API_URL = 'http://localhost:5000';
const defaultProfilePic = 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png';

const ChefsPage = () => {
  // ... (toda la lógica de fetch se mantiene igual) ...
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const renderContent = () => {
    if (loading) {
      return <p className="loading-message">Cargando chefs...</p>;
    }
    // ... (lógica de error y vacío se mantiene igual) ...
    if (error) {
      return <p className="error-message">Error al cargar chefs: {error}</p>;
    }

    if (chefs.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No hay chefs registrados todavía.</p>
        </div>
      );
    }

    return (
      <div className="chefs-list">
        {chefs.map((chef) => {
          
          const imageUrl = chef.profileImageUrl 
            ? `${API_URL}/${chef.profileImageUrl}` 
            : defaultProfilePic;

          return (
            // --- REQUISITO: Clase de tarjeta cambiada ---
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
      
      {renderContent()}
    </div>
  );
};

export default ChefsPage;