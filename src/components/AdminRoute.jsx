import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Componente para proteger rutas de Administrador.
 * 1. Verifica si hay un token.
 * 2. Verifica si el usuario guardado en localStorage tiene el rol 'admin'.
 * 3. Si no tiene rol, intenta actualizarlo desde el backend.
 */
const AdminRoute = () => {
  const [chef, setChef] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadChef = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      const chefString = localStorage.getItem('chef');
      let chefData = null;
      
      if (chefString) {
        try {
          chefData = JSON.parse(chefString);
        } catch (e) {
          console.error('Error al parsear datos del chef en AdminRoute:', e);
          setLoading(false);
          return;
        }
      }

      // Si el chef no tiene rol definido, intentamos actualizarlo desde el backend
      if (!chefData?.role && chefData?._id) {
        try {
          // Intentamos usar /api/chefs/me primero
          let response = await fetch('http://localhost:5000/api/chefs/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          });

          // Si /me no existe, intentamos con el ID
          if (!response.ok) {
            response = await fetch(`http://localhost:5000/api/chefs/${chefData._id}`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
          }

          if (response.ok) {
            const updatedChef = await response.json();
            localStorage.setItem('chef', JSON.stringify(updatedChef));
            chefData = updatedChef;
            console.log('AdminRoute - Chef actualizado desde backend:', updatedChef);
          }
        } catch (error) {
          console.error('AdminRoute - Error al actualizar chef:', error);
        }
      }

      setChef(chefData);
      setLoading(false);
    };

    loadChef();
  }, [token]);

  // Logs de depuración
  console.log('AdminRoute - Token:', token ? 'Presente' : 'Ausente');
  console.log('AdminRoute - Loading:', loading);
  console.log('AdminRoute - Chef:', chef);
  console.log('AdminRoute - Chef role:', chef?.role);

  // 1. Si no hay token, redirigir a /login
  if (!token) {
    console.log('AdminRoute - No hay token, redirigiendo a /login');
    return <Navigate to="/login" replace />;
  }

  // 2. Mientras carga, permitimos el renderizado pero AdminPage manejará su propio loading
  // Esto permite que React Router matchee la ruta correctamente
  if (loading) {
    console.log('AdminRoute - Cargando, mostrando Outlet (AdminPage manejará el loading)');
    return <Outlet />;
  }

  // 3. Si hay token, PERO no es admin (o no se pudieron cargar los datos)
  // Verificamos explícitamente que el role sea 'admin'
  if (!chef || chef.role !== 'admin') {
    console.log('AdminRoute - No es admin, redirigiendo a /profile');
    // Lo redirigimos a su perfil (o al home '/')
    // No debería poder ver la página de admin
    return <Navigate to="/profile" replace />;
  }

  // 4. Si hay token Y es admin, permite el acceso a la ruta hija
  console.log('AdminRoute - Acceso permitido, mostrando <Outlet />');
  return <Outlet />;
};

export default AdminRoute;