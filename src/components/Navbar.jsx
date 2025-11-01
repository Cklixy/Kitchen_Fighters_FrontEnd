import React from 'react';
import { Link } from 'react-router-dom';
import '../css/index.css';

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: 'var(--color-primary)',
      padding: '1rem',
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'center'
    }}>
      <Link 
        to="/" 
        style={{
          color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}
      >
        Kitchen Fighters
      </Link>
      <Link 
        to="/" 
        style={{
          color: 'white',
          textDecoration: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          transition: 'background-color 0.3s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Home
      </Link>
      <Link 
        to="/tournaments"
        style={{
          color: 'white',
          textDecoration: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          transition: 'background-color 0.3s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Tournaments
      </Link>
      <Link 
        to="/chefs"
        style={{
          color: 'white',
          textDecoration: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          transition: 'background-color 0.3s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Chefs
      </Link>
    </nav>
  );
};

export default Navbar;

