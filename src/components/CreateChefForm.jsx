/* src/components/CreateChefForm.jsx */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { specialtyCategories } from '../data/specialties.js'; // <-- ¡¡AÑADIDO!!

const API_URL = 'http://localhost:5000';

const CreateChefForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // --- ¡¡NUEVA LÓGICA DE ESPECIALIDAD!! ---
  const [selectedCategory, setSelectedCategory] = useState('');
  const [availableSpecialties, setAvailableSpecialties] = useState([]);
  const [specialty, setSpecialty] = useState(''); 
  // --- FIN DE NUEVA LÓGICA ---

  const [experienceYears, setExperienceYears] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- ¡¡NUEVA FUNCIÓN!! ---
  // Actualiza el 2do dropdown cuando la categoría cambia
  const handleCategoryChange = (e) => {
    const categoryName = e.target.value;
    setSelectedCategory(categoryName);
    setSpecialty(''); // Resetea la especialidad
    
    if (categoryName) {
      const category = specialtyCategories.find(c => c.name === categoryName);
      setAvailableSpecialties(category.specialties);
    } else {
      setAvailableSpecialties([]);
    }
  };
  // --- FIN DE NUEVA FUNCIÓN ---

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!specialty) {
      setError('Por favor, selecciona una categoría y una especialidad.');
      return;
    }
    
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('specialty', specialty); // Se envía el string final
    formData.append('experienceYears', experienceYears);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const response = await fetch(`${API_URL}/api/chefs/register`, {
        method: 'POST',
        body: formData, 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al crear la cuenta');
      }

      setSuccess('¡Chef registrado exitosamente! Redirigiendo al inicio de sesión...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error desconocido.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // Quitamos el 'noValidate' para que 'required' funcione mejor
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nombre de Chef</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>

      {/* --- ¡¡CAMPO DE ESPECIALIDAD MODIFICADO (AHORA SON 2)!! --- */}
      <div className="form-group">
        <label htmlFor="category">Categoría de Especialidad</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange} // <-- Usa la nueva función
          required
        >
          <option value="" disabled>1. Selecciona una categoría...</option>
          {specialtyCategories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name.replace(/---/g, '')} {/* Quita los "---" */}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="specialty">Especialidad Principal</label>
        <select
          id="specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          required
          disabled={!selectedCategory} // <-- Deshabilitado hasta que elijan categoría
        >
          <option value="" disabled>2. Selecciona una especialidad...</option>
          {availableSpecialties.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>
      {/* --- FIN DEL CAMPO MODIFICADO --- */}

      <div className="form-group">
        <label htmlFor="experienceYears">Años de Experiencia</label>
        <input
          type="number"
          id="experienceYears"
          value={experienceYears}
          onChange={(e) => setExperienceYears(e.target.value)}
          required
          min="0"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="profileImage">Foto de Perfil</label>
        <input
          type="file"
          id="profileImage"
          onChange={(e) => setProfileImage(e.target.files ? e.target.files[0] : null)}
          accept="image/png, image/jpeg, image/gif, image/webp"
        />
      </div>

      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? 'Registrando...' : 'Crear Cuenta'}
      </button>

      {error && <p className="form-message error-message">{error}</p>}
      {success && <p className="form-message success-message">{success}</p>}
    </form>
  );
};

export default CreateChefForm;