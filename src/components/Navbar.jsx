import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/index.css'; //

const Navbar = () => {
  const navigate = useNavigate();
  const [chef, setChef] = useState(null);

  // 1. Función para actualizar el chef desde el backend usando /api/chefs/me
  const refreshChefFromBackend = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      // Intentamos usar /api/chefs/me primero (endpoint para usuario actual)
      let response = await fetch('http://localhost:5000/api/chefs/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Si /me no existe, intentamos con el ID del chef en localStorage
      if (!response.ok) {
        const storedChef = localStorage.getItem('chef');
        if (storedChef) {
          const chefData = JSON.parse(storedChef);
          if (chefData._id) {
            response = await fetch(`http://localhost:5000/api/chefs/${chefData._id}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
          }
        }
      }

      if (response.ok) {
        const updatedChef = await response.json();
        // Actualizamos localStorage con los datos frescos del backend
        localStorage.setItem('chef', JSON.stringify(updatedChef));
        setChef(updatedChef);
        console.log('Chef actualizado desde backend:', updatedChef);
        console.log('Rol del chef actualizado:', updatedChef.role);
        return updatedChef;
      }
    } catch (error) {
      console.error('Error al actualizar chef desde backend:', error);
    }
    return null;
  };

  // 2. Función para cargar el chef desde localStorage
  const loadChef = async () => {
    const storedChef = localStorage.getItem('chef');
    if (storedChef && storedChef !== 'undefined') {
      try {
        const chefData = JSON.parse(storedChef);
        
        // Si el chef no tiene rol definido, intentamos actualizarlo desde el backend
        if (!chefData.role) {
          console.log('Rol no encontrado, actualizando desde backend...');
          const updatedChef = await refreshChefFromBackend();
          if (updatedChef) {
            return; // Ya se actualizó en refreshChefFromBackend
          }
        }
        
        setChef(chefData);
        // Depuración: verificar el rol
        console.log('Chef cargado en Navbar:', chefData);
        console.log('Rol del chef:', chefData.role);
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

  // 3. Al cargar, llamamos a la función
  useEffect(() => {
    loadChef();

    // 4. Escuchamos por cambios en el localStorage
    const handleStorageChange = () => {
      loadChef();
    };

    // 'storage' se dispara cuando OTRA pestaña cambia el localStorage.
    window.addEventListener('storage', handleStorageChange);
    
    // Creamos un evento custom para forzar la actualización
    // si el login/logout ocurre en la MISMA pestaña.
    window.addEventListener('local-storage-changed', handleStorageChange);

    // Limpiamos los listeners al desmontar
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-changed', handleStorageChange);
    };
  }, []);

  // 5. Función de Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('chef');
    setChef(null);
    // Disparamos el evento custom
    window.dispatchEvent(new Event('local-storage-changed'));
    navigate('/');
  };

  // 6. (Importante) Actualiza tu LoginPage.jsx
  // Asegúrate de que tu LoginPage.jsx dispare este evento después de un login exitoso:
  // window.dispatchEvent(new Event('local-storage-changed'));
  // (El código de LoginPage.jsx no está aquí, pero es un recordatorio)

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

      {/* --- 7. Lógica de autenticación ACTUALIZADA --- */}
      {chef ? (
        // --- Si está logueado ---
        <>
          <span style={welcomeStyle}>¡Hola, {chef.name}!</span>
          
          <Link 
            to="/profile"
            style={linkStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Mi Perfil
          </Link>

          {/* --- ¡¡ENLACE DE ADMIN AÑADIDO!! --- */}
          {/* Solo se muestra si el chef tiene el rol 'admin' */}
          {/* Verificamos explícitamente que el role sea 'admin' */}
          {chef.role === 'admin' && (
            <Link 
              to="/admin"
              style={{...linkStyle, backgroundColor: 'rgba(255, 215, 0, 0.2)', border: '1px solid rgba(255, 215, 0, 0.5)'}} // Estilo dorado
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 215, 0, 0.4)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 215, 0, 0.2)'}
            >
              Panel Admin
            </Link>
          )}
          {/* --- FIN DEL CÓDIGO AÑADIDO --- */}
          
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