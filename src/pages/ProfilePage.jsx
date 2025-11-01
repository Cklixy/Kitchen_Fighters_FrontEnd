import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/forms.css'; // Reutilizamos el CSS de formularios
import '../css/profile.css'; // Añadimos el nuevo CSS de perfil

// URL base de tu backend
const API_URL = 'http://localhost:5000';

const ProfilePage = () => {
  const navigate = useNavigate();
  
  // 1. Estados para los datos del chef y el formulario
  const [chef, setChef] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    specialty: '',
    experienceYears: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // 2. Estados para la UI
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // 3. Cargar datos del chef desde localStorage al montar
  useEffect(() => {
    const storedChef = localStorage.getItem('chef');
    if (storedChef) {
      const chefData = JSON.parse(storedChef);
      setChef(chefData);
      // Rellenamos el formulario con los datos actuales
      setFormData({
        description: chefData.description || '',
        specialty: chefData.specialty || '',
        experienceYears: chefData.experienceYears || 0
      });
      // Establecemos la imagen de perfil actual
      if (chefData.profileImageUrl) {
        setPreviewImage(`${API_URL}/${chefData.profileImageUrl}`);
      }
      setLoading(false);
    } else {
      // Si no hay chef en localStorage, es un error (debería protegerlo ProtectedRoute)
      setError('No se pudieron cargar los datos del chef.');
      setLoading(false);
    }
  }, []);

  // 4. Manejador para cambios en los inputs de texto
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 5. Manejador para el cambio de archivo (imagen)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      // Creamos una URL local para la previsualización
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // 6. Manejador para el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    // 7. Usamos FormData porque vamos a enviar un archivo (multipart/form-data)
    const data = new FormData();
    data.append('description', formData.description);
    data.append('specialty', formData.specialty);
    data.append('experienceYears', formData.experienceYears);
    
    if (profileImage) {
      // 'profileImage' debe coincidir con 'upload.single('profileImage')' en el backend
      data.append('profileImage', profileImage);
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No autorizado. Por favor, inicia sesión de nuevo.');
      }

      // 8. Hacemos la petición PUT a la ruta protegida
      const response = await fetch(`${API_URL}/api/chefs/profile`, {
        method: 'PUT',
        headers: {
          // ¡Importante! Enviamos el token de autorización
          'Authorization': `Bearer ${token}`
          // NO ponemos 'Content-Type': 'application/json',
          // FormData lo gestiona automáticamente.
        },
        body: data // Enviamos el FormData
      });

      const updatedChef = await response.json();

      if (!response.ok) {
        throw new Error(updatedChef.message || 'Error al actualizar el perfil');
      }

      // 9. Éxito: Actualizamos el localStorage y mostramos mensaje
      localStorage.setItem('chef', JSON.stringify(updatedChef));
      setChef(updatedChef);
      setSuccess('¡Perfil actualizado exitosamente!');
      
      // Actualizamos la URL de la imagen si cambió
      if (updatedChef.profileImageUrl) {
        setPreviewImage(`${API_URL}/${updatedChef.profileImageUrl}`);
      }
      
      // Recargamos el Navbar
      window.dispatchEvent(new Event('storage'));

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

  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="profile-page-container">
      <div className="profile-header">
        <h1>Editar Mi Perfil</h1>
        <p>Actualiza tu información pública</p>
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* Previsualización de la Imagen */}
        <div className="profile-image-preview">
          <img 
            src={previewImage || 'https://via.placeholder.com/150'} 
            alt="Vista previa del perfil" 
          />
        </div>

        {/* Campo de Imagen */}
        <div className="form-group">
          <label htmlFor="profileImage">Foto de Perfil</label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/png, image/jpeg, image/gif, image/webp"
            onChange={handleFileChange}
          />
        </div>
        
        {/* Campo de Descripción */}
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

        {/* Campo de Especialidad */}
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

        {/* Campo de Experiencia */}
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
      </form>
    </div>
  );
};

export default ProfilePage;