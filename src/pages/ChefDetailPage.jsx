/* src/pages/ChefDetailPage.tsx */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/chef-detail.css'; // Importamos el CSS nuevo
// Importamos homepage para el estilo del botón
import '../css/homepage.css'; 

const API_URL = 'http://localhost:5000';
const defaultProfilePic = 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png';

const ChefDetailPage = () => {
  const { id } = useParams();
  const [chef, setChef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChef = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/chefs/${id}`);
        
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || `Error ${response.status}: No se pudo obtener el chef`);
        }
        
        const data = await response.json();
        setChef(data);
      } catch (err) {
        console.error('Error al cargar chef:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocurrió un error desconocido.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChef();
  }, [id]);

  if (loading) {
    return <p className="loading-message">Cargando perfil del chef...</p>;
  }

  if (error) {
    return <p className="error-message">Error al cargar chef: {error}</p>;
  }

  if (!chef) {
    return <p>Chef no encontrado.</p>;
  }

  const imageUrl = chef.profileImageUrl 
    ? `${API_URL}/${chef.profileImageUrl}` 
    : defaultProfilePic;

  return (
    // Contenedor principal de la página
    <div className="chef-detail-wrapper">
      
      {/* Botón "Volver" con estilo "glass" */}
      <Link 
        to="/chefs" 
        className="glass-button-secondary" 
        style={{ alignSelf: 'flex-start' }}
      >
        &larr; Volver a todos los chefs
      </Link>
      
      {/* Tarjeta "glass" para el contenido */}
      <div className="chef-detail-container">
        <header className="chef-detail-header">
          <img 
            src={imageUrl} 
            alt={chef.name} 
            className="chef-detail-img"
            onError={(e) => { e.target.onerror = null; e.target.src = defaultProfilePic; }}
          />
          <h1>{chef.name}</h1>
          <p>{chef.specialty}</p>
        </header>
        
        <main className="chef-detail-body">
          <section>
            <h2>Biografía</h2>
            <p className="bio">
              {chef.description || 'Este chef aún no ha añadido una biografía.'}
            </p>
          </section>
          
          <section>
            <h2>Experiencia</h2>
            <p>
              {chef.experienceYears} años en la industria culinaria.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ChefDetailPage;