import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

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

      if (!chefData?.role && chefData?._id) {
        try {
          let response = await fetch('http://localhost:5000/api/chefs/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          });

          if (!response.ok) {
            response = await fetch(`http://localhost:5000/api/chefs/${chefData._id}`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
          }

          if (response.ok) {
            const updatedChef = await response.json();
            localStorage.setItem('chef', JSON.stringify(updatedChef));
            chefData = updatedChef;
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

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return <Outlet />;
  }

  if (!chef || chef.role !== 'admin') {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;