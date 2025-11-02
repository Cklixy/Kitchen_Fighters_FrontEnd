/* src/pages/ProfilePage.jsx */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/forms.css'; 
import '../css/profile.css'; 

const API_URL = 'http://localhost:5000';
// Imagen por defecto actualizada al estilo
const defaultProfilePic = 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png';

const ProfilePage = () => {
  const navigate = useNavigate();
  
  const [chef, setChef] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    specialty: '',
    experienceYears: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const storedChef = localStorage.getItem('chef');
    if (storedChef) {
      const chefData = JSON.parse(storedChef);
      setChef(chefData);
      setFormData({
        description: chefData.description || '',
        specialty: chefData.specialty || '',
        experienceYears: chefData.experienceYears || 0
      });
      if (chefData.profileImageUrl) {
        setPreviewImage(`${API_URL}/${chefData.profileImageUrl}`);
      } else {
        setPreviewImage(defaultProfilePic);
      }
      setLoading(false);
    } else {
      setError('No se pudieron cargar los datos del chef.');
      setLoading(false);
    }
  }, []);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const data = new FormData();
    data.append('description', formData.description);
    data.append('specialty', formData.specialty);
    data.append('experienceYears', formData.experienceYears);
    
    if (profileImage) {
      data.append('profileImage', profileImage);
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No autorizado. Por favor, inicia sesión de nuevo.');
      }

      const response = await fetch(`${API_URL}/api/chefs/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });

      const updatedChef = await response.json();

      if (!response.ok) {
        throw new Error(updatedChef.message || 'Error al actualizar el perfil');
      }

      localStorage.setItem('chef', JSON.stringify(updatedChef));
      setChef(updatedChef);
      setSuccess('¡Perfil actualizado exitosamente!');
      
      if (updatedChef.profileImageUrl) {
        setPreviewImage(`${API_URL}/${updatedChef.profileImageUrl}`);
      }
      
      window.dispatchEvent(new Event('local-storage-changed'));

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error desconocido.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('chef');
    window.dispatchEvent(new Event('local-storage-changed'));
    navigate('/');
  };

  if (loading) {
    return <p className="loading-message">Cargando perfil...</p>;
  }

  return (
    <div className="form-container-wrapper"> 
      {/* REQUISITO: Añadida clase 'profile-form-container' para el ancho */ }
      <form onSubmit={handleSubmit} className="form-container profile-form-container">
        
        <div className="profile-header">
          <h2>Editar Mi Perfil</h2>
          <p>Actualiza tu información pública</p>
        </div>

        <div className="profile-image-preview">
          <img 
            src={previewImage || defaultProfilePic} 
            alt="Vista previa del perfil" 
            onError={(e) => { e.target.onerror = null; e.target.src = defaultProfilePic; }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="profileImage">Foto de Perfil</label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/png, image/jpeg, image/gif, image/webp"
            onChange={handleFileChange}
            className="input-file"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Tu Biografía</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleTextChange}
            placeholder="Cuéntale al mundo sobre tu estilo de cocina..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="specialty">Especialidad</label>
          <input
            type="text"
            id="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleTextChange}
            required
            placeholder="Ej: Cocina Francesa"
          />
        </div>

        <div className="form-group">
          <label htmlFor="experienceYears">Años de Experiencia</label>
          <input
            type="number"
            id="experienceYears"
            name="experienceYears"
            value={formData.experienceYears}
            onChange={handleTextChange}
            required
            min="0"
            placeholder="Ej: 25"
          />
        </div>

        <button type="submit" className="btn-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
        </button>

        {error && <p className="form-message error-message">{error}</p>}
        {success && <p className="form-message success-message">{success}</p>}

        <hr className="divider" />
        <button 
          type="button"
          onClick={handleLogout}
          className="logout-button"
        >
          Cerrar Sesión
        </button>
        
      </form>
    </div>
  );
};

export default ProfilePage;