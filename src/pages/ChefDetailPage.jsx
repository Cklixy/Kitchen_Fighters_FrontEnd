import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/chef-detail.css'; // Importamos el CSS nuevo

const API_URL = 'http://localhost:5000';
const defaultProfilePic = 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png';

const ChefDetailPage = () => {
  // 1. Obtenemos el ID de la URL (gracias a la ruta /chefs/:id)
  const { id } = useParams();

  const [chef, setChef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. useEffect para cargar los datos del chef específico
  useEffect(() => {
    const fetchChef = async () => {
      try {
        setLoading(true);
        // Usamos el endpoint GET /api/chefs/:id que ya existe en el backend
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
  }, [id]); // Se ejecuta cada vez que el 'id' cambie

  // 3. Renderizado principal
  if (loading) {
    return <p className="loading-message">Cargando perfil del chef...</p>;
  }

  if (error) {
    return <p className="error-message">Error al cargar chef: {error}</p>;
  }

  if (!chef) {
    return <p>Chef no encontrado.</p>;
  }

  // 4. Construimos la URL de la imagen
  const imageUrl = chef.profileImageUrl 
    ? `${API_URL}/${chef.profileImageUrl}` 
    : defaultProfilePic;

  return (
    <div>
      <Link to="/chefs" className="back-link">
        &larr; Volver a todos los chefs
      </Link>
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
          <h2>Biografía</h2>
          <p className="bio">
            {chef.description || 'Este chef aún no ha añadido una biografía.'}
          </p>
          <h2>Experiencia</h2>
          <p style={{ fontSize: '1.1rem' }}>
            {chef.experienceYears} años en la industria culinaria.
          </p>
        </main>
      </div>
    </div>
  );
};

export default ChefDetailPage;