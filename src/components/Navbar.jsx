/* src/components/Navbar.jsx */

import React, { useState, useEffect } from 'react';
// 'useNavigate' ya no es necesario aquí
import { Link } from 'react-router-dom'; 
import '../css/navbar.css'; 

const Navbar = () => {
  // 'navigate' ya no se usa aquí
  const [chef, setChef] = useState(null);

  // --- LÓGICA PARA CARGAR Y ACTUALIZAR EL CHEF (SIN CAMBIOS) ---
  // (Esta lógica se mantiene igual que antes)
  // 1. Función para actualizar el chef desde el backend
  const refreshChefFromBackend = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      let response = await fetch('http://localhost:5000/api/chefs/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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
        localStorage.setItem('chef', JSON.stringify(updatedChef));
        setChef(updatedChef);
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
        if (!chefData.role) {
          const updatedChef = await refreshChefFromBackend();
          if (updatedChef) {
            return;
          }
        }
        setChef(chefData);
      } catch (e) {
        localStorage.removeItem('chef');
        localStorage.removeItem('token');
        setChef(null);
      }
    } else {
      setChef(null);
    }
  };

  // 3. useEffect (sin cambios)
  useEffect(() => {
    loadChef();
    const handleStorageChange = () => {
      loadChef();
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage-changed', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-changed', handleStorageChange);
    };
  }, []);

  // 5. 'handleLogout' FUE ELIMINADO DE ESTE ARCHIVO

  return (
    <nav className="pill-nav-wrapper">
      {/* REQUISITO: El glass-effect ahora tiene un borde más redondeado */}
      <div className="pill-nav glass-effect">
        
        {/* --- REQUISITO: FILA 1 --- */}
        <div className="nav-row">
          <Link to="/" className="nav-brand">
            Kitchen Fighters
          </Link>
          <Link to="/tournaments" className="nav-item">
            Tournaments
          </Link>
          <Link to="/chefs" className="nav-item">
            Chefs
          </Link>
          
          {/* 'Mi Perfil' solo se muestra si está logueado */}
          {chef && (
            <Link to="/profile" className="nav-item">
              Mi Perfil
            </Link>
          )}
        </div>
        
        {/* --- REQUISITO: FILA 2 (Autenticación) --- */}
        <div className="nav-row nav-row-auth">
          {chef ? (
            // --- Si está logueado ---
            <>
              {/* REQUISITO: Solo el nombre, sin '¡Hola, ...!' */}
              {/* También le damos la clase 'nav-item' para el estilo pill */ }
              <span className="nav-item nav-welcome">{chef.name}</span>
              
              {chef.role === 'admin' && (
                <Link to="/admin" className="nav-item admin-link">
                  Panel Admin
                </Link>
              )}
              
              {/* El botón 'Salir' se movió a ProfilePage.jsx */}
            </>
          ) : (
            // --- Si NO está logueado ---
            <>
              <Link to="/chefs/register" className="nav-item">
                Registrar
              </Link>
              <Link to="/login" className="nav-item button-login">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;