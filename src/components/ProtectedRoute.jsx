import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Componente para proteger rutas.
 * Verifica si hay un token en localStorage.
 * Si existe, muestra el componente hijo (a través de <Outlet />).
 * Si no, redirige al usuario a la página de login.
 */
const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    // No hay token, redirigir a login
    return <Navigate to="/login" replace />;
  }

  // Hay un token, permitir el acceso a la ruta
  return <Outlet />;
};

export default ProtectedRoute;