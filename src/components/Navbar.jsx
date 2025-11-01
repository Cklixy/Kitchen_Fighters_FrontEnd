import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/index.css'; //

const Navbar = () => {
  const navigate = useNavigate();
  const [chef, setChef] = useState(null);

  // 1. Función para cargar el chef desde localStorage
  const loadChef = () => {
    const storedChef = localStorage.getItem('chef');
    if (storedChef && storedChef !== 'undefined') {
      try {
        setChef(JSON.parse(storedChef));
      } catch (e) {
        // Limpiamos si hay datos corruptos
        localStorage.removeItem('chef');
        localStorage.removeItem('token');
        setChef(null);
      }
    } else {
      setChef(null);
    }
  };

  // 2. Al cargar, llamamos a la función
  useEffect(() => {
    loadChef();

    // 3. ¡CAMBIO IMPORTANTE!
    // Escuchamos por cambios en el localStorage desde otras pestañas/componentes
    // Esto es para que cuando actualicemos el perfil, el Navbar lo sepa.
    const handleStorageChange = () => {
      loadChef();
    };

    window.addEventListener('storage', handleStorageChange);

    // Limpiamos el listener al desmontar
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // 4. Función de Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('chef');
    setChef(null);
    navigate('/');
    // Ya no es necesario 'window.location.reload()' aquí
  };

  // Estilos (sin cambios)
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  };

  const buttonStyle = {
    ...linkStyle,
    backgroundColor: 'transparent',
    border: '1px solid white',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 'inherit'
  };

  const welcomeStyle = {
    color: 'white',
    margin: '0',
    padding: '0.5rem 1rem',
    fontSize: '0.9rem'
  };

  return (
    <nav style={{
      backgroundColor: 'var(--color-primary)',
      padding: '1rem',
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      flexWrap: 'wrap' // Para mejor responsive
    }}>
      <Link 
        to="/" 
        style={{
          color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          marginRight: 'auto'
        }}
      >
        Kitchen Fighters
      </Link>

      <Link 
        to="/" 
        style={linkStyle}
        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Home
      </Link>
      <Link 
        to="/tournaments"
        style={linkStyle}
        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Tournaments
      </Link>
      <Link 
        to="/chefs"
        style={linkStyle}
        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Chefs
      </Link>

      {/* --- 5. Lógica de autenticación ACTUALIZADA --- */}
      {chef ? (
        // --- Si está logueado ---
        <>
          <span style={welcomeStyle}>¡Hola, {chef.name}!</span>
          
          {/* --- ENLACE A PERFIL AÑADIDO --- */}
          <Link 
            to="/profile"
            style={linkStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Mi Perfil
          </Link>
          
          <button 
            onClick={handleLogout}
            style={buttonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Salir
          </button>
        </>
      ) : (
        // --- Si NO está logueado ---
        <>
          <Link 
            to="/chefs/register"
            style={linkStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Registrar
          </Link>
          <Link 
            to="/login"
            style={buttonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Login
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;