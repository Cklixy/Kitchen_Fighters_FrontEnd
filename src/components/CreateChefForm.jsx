import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/forms.css'; //

/**
 * Componente de formulario para crear un nuevo Chef.
 */
const CreateChefForm = () => {
  const navigate = useNavigate();

  // 1. Añadimos estado para email y password
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const experienceNum = parseInt(experienceYears, 10);
    if (isNaN(experienceNum) || experienceNum < 0) {
      setError('Los años de experiencia deben ser un número positivo.');
      setIsSubmitting(false);
      return;
    }

    // 2. Creamos el objeto de datos completo
    const chefData = {
      name,
      specialty,
      experienceYears: experienceNum,
      email,
      password,
    };

    try {
      // 3. Enviamos al endpoint del backend
      const response = await fetch('http://localhost:5000/api/chefs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chefData),
      });

      if (!response.ok) {
        // Capturamos el mensaje de error del backend (ej. email duplicado)
        const errData = await response.json();
        throw new Error(errData.message || `Error ${response.status}: No se pudo crear el chef`);
      }

      const newChef = await response.json();

      setSuccess(`¡Chef "${newChef.name}" creado! Redirigiendo a la lista...`);
      
      // 4. Limpiamos todos los campos
      setName('');
      setSpecialty('');
      setExperienceYears('');
      setEmail('');
      setPassword('');
      
      // Redirigimos a la lista de chefs
      setTimeout(() => {
        navigate('/chefs'); //
      }, 1500);

    } catch (err) {
      console.error('Error al crear chef:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error desconocido.');
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Registrar Nuevo Chef</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Campo Nombre */}
        <div className="form-group">
          <label htmlFor="name">Nombre del Chef</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Ej: Gordon Ramsay"
          />
        </div>

        {/* Campo Especialidad */}
        <div className="form-group">
          <label htmlFor="specialty">Especialidad</label>
          <input
            type="text"
            id="specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
            placeholder="Ej: Cocina Francesa"
          />
        </div>

        {/* Campo Años de Experiencia */}
        <div className="form-group">
          <label htmlFor="experienceYears">Años de Experiencia</label>
          <input
            type="number"
            id="experienceYears"
            value={experienceYears}
            onChange={(e) => setExperienceYears(e.target.value)}
            required
            min="0"
            placeholder="Ej: 25"
          />
        </div>
        
        {/* --- 5. CAMPO DE CORREO --- */}
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Ej: chef@cocina.com"
          />
        </div>

        {/* --- 6. CAMPO DE CONTRASEÑA --- */}
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        <button type="submit" className="btn-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Registrar Chef'}
        </button>

        {error && <p className="form-message error-message">{error}</p>}
        {success && <p className="form-message success-message">{success}</p>}
      </form>
    </div>
  );
};

export default CreateChefForm;