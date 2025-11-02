import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/forms.css'; // Reutilizamos el CSS de formularios

const API_URL = 'http://localhost:5000';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch(`${API_URL}/api/chefs/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al enviar el correo');
      }

      // Siempre mostramos un mensaje genérico por seguridad
      setMessage(data.message);
      setEmail(''); // Limpiar el campo
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Recuperar Contraseña</h2>
        <p style={{ color: '#666', textAlign: 'center', marginBottom: '1.5rem' }}>
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu@correo.com"
          />
        </div>

        <button type="submit" className="btn-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar Enlace'}
        </button>

        {message && <p className="form-message success-message">{message}</p>}
        {error && <p className="form-message error-message">{error}</p>}

        <p className="form-switch">
          ¿Recordaste tu contraseña? <Link to="/login">Inicia Sesión</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;