
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, setErrorMessage }) => {
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (!user) {
      setErrorMessage('You need to log in to access that page.');
    }
  }, [user, setErrorMessage]);

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
