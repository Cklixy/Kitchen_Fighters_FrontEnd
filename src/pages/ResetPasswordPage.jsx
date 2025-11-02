import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../css/forms.css';

const API_URL = 'http://localhost:5000';

const ResetPasswordPage = () => {
  const { token } = useParams(); // Obtiene el token de la URL
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/chefs/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al restablecer la contraseña');
      }

      setMessage(data.message);
      
      // Redirigir a login después de 3 segundos
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Restablecer Contraseña</h2>
        
        {!message ? (
          <>
            <div className="form-group">
              <label htmlFor="password">Nueva Contraseña</label>
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

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Repite la contraseña"
              />
            </div>

            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Actualizando...' : 'Actualizar Contraseña'}
            </button>
          </>
        ) : (
          <>
            <p className="form-message success-message">
              {message} Serás redirigido a Iniciar Sesión...
            </p>
            <Link to="/login" className="btn-submit" style={{textAlign: 'center', textDecoration: 'none'}}>
              Ir a Iniciar Sesión
            </Link>
          </>
        )}

        {error && <p className="form-message error-message">{error}</p>}

      </form>
    </div>
  );
};

export default ResetPasswordPage;