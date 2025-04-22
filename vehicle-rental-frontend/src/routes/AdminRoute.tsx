import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactElement;
}

const AdminRoute: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin/login" />;
};

export default AdminRoute;

// ✅ This ensures TypeScript treats it as a module
export {};
