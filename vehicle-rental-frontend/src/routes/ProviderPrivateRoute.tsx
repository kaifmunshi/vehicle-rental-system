// src/routes/ProviderPrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProviderPrivateRouteProps {
  children: React.ReactNode;
}

const ProviderPrivateRoute: React.FC<ProviderPrivateRouteProps> = ({ children }) => {
  const providerToken = localStorage.getItem('providerToken');

  return providerToken ? <>{children}</> : <Navigate to="/provider/login" replace />;
};

export default ProviderPrivateRoute;
