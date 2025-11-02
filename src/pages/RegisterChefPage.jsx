/* src/pages/RegisterChefPage.jsx */

import React from 'react';
import { Link } from 'react-router-dom';
import CreateChefForm from '../components/CreateChefForm';
import '../css/forms.css';

const RegisterChefPage = () => {
  return (
    // ¡¡ESTRUCTURA MODIFICADA!! (Igual a LoginPage)
    <div className="form-page-container">
      <div className="form-container">
        
        <h1 style={{ textAlign: 'center' }}>Crear Cuenta</h1>
        <p style={{ textAlign: 'center', color: '#c0c0c0', marginTop: '-1rem', marginBottom: '1.5rem' }}>
          Únete a la élite de la cocina.
        </p>

        <CreateChefForm />

        <p className="form-link" style={{ marginTop: '1.5rem' }}>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterChefPage;