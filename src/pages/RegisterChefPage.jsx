/* src/pages/RegisterChefPage.jsx */

import React from 'react';
import CreateChefForm from '../components/CreateChefForm';
// REQUISITO: Importar el CSS que centra el formulario
import '../css/forms.css'; 

const RegisterChefPage = () => {
  return (
    // REQUISITO: Añadir el 'wrapper' para centrar el contenido
    <div className="form-container-wrapper">
      <CreateChefForm />
    </div>
  );
};

export default RegisterChefPage;