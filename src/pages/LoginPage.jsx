import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Reutilizamos los estilos del formulario
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
      
      // --- ¡ESTA ES LA LÍNEA IMPORTANTE! ---
      // Asegúrate de que la URL tenga "http://localhost:5000" al principio
      // para llamar a tu backend, no al frontend.
      const response = await fetch('http://localhost:5000/api/chefs/login', { //
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // data.message viene del backend (ej: "Credenciales inválidas")
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // 2. Si el login es exitoso, guardamos los datos
      if (data.token && data.chef) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('chef', JSON.stringify(data.chef));
      } else {
        throw new Error('Respuesta inválida del servidor');
      }

      // 3. Limpiamos formulario y redirigimos al Home
      setEmail('');
      setPassword('');
      // Disparamos el evento para actualizar el Navbar
      window.dispatchEvent(new Event('local-storage-changed'));
      navigate('/'); //

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error desconocido.');
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <div className="form-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          
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
      </div>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link to="/chefs/register" style={{ color: 'var(--color-text-light)' }}>
          ¿No tienes cuenta? Regístrate aquí
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;