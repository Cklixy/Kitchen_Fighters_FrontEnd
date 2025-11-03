/* src/pages/ResetPasswordPage.jsx */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/forms.css'; // Reutilizamos los estilos de formulario

const API_URL = 'http://localhost:5000';

const ResetPasswordPage = () => {
  // Obtenemos el 'token' de la URL, no 'id'
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      // Usamos el endpoint que definiste en el backend
      const response = await fetch(`${API_URL}/api/chefs/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'No se pudo resetear la contraseña.');
      }

      setMessage(data.message);
      // Opcional: Redirigir al login después de unos segundos
      setTimeout(() => {
        navigate('/login');
      }, 3000);

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
    // CAMBIO 1: Añadido "form-page-container" para centrar
    <div className="form-page-container">
      <div className="form-container"> {/* Este es el div con el fondo "glass" */}
        
        {/* CAMBIO 2: Eliminada la clase "form-card" que no se usa aquí */}
        <form onSubmit={handleSubmit}> 
          <h2>Restablecer Contraseña</h2>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          {!message && ( // Oculta el formulario si ya hay un mensaje de éxito
            <>
              <p>Ingresa tu nueva contraseña.</p>
              <div className="form-group">
                <label htmlFor="password">Nueva Contraseña</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* CAMBIO 3: Clase del botón cambiada a "btn-submit" */}
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
