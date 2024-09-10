import React, { ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }:{children:ReactNode}) => {
    const [cookies] = useCookies();
    const token = cookies.token || null;
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
