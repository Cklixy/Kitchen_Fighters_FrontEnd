import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/forms.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/chefs/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      if (data.token && data.chef) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('chef', JSON.stringify(data.chef));
      } else {
        throw new Error('Respuesta inválida del servidor');
      }

      setEmail('');
      setPassword('');
      window.dispatchEvent(new Event('local-storage-changed'));
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
      setIsSubmitting(false);
    }
  };

  return (
    // Cambié el wrapper al nombre correcto
    <div className="form-page-container">  
      <div className="form-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="chef@cocina.com"
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
              placeholder="Tu contraseña"
            />
          </div>

          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
          </button>

          {error && <p className="form-message error-message">{error}</p>}
        </form>

        <div className="form-link">
          <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          <br />
          <Link to="/chefs/register">¿No tienes cuenta? Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
