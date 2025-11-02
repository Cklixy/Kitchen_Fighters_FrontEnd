import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = () => {
  const [chef, setChef] = useState(null);

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

  return (
    <nav className="pill-nav-wrapper">
      <div className="pill-nav glass-effect">
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

          {chef && (
            <Link to="/profile" className="nav-item">
              Mi Perfil
            </Link>
          )}
        </div>

        <div className="nav-row nav-row-auth">
          {chef ? (
            <>
              <span className="nav-item nav-welcome">{chef.name}</span>

              {chef.role === 'admin' && (
                <Link to="/admin" className="nav-item admin-link">
                  Panel Admin
                </Link>
              )}
            </>
          ) : (
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