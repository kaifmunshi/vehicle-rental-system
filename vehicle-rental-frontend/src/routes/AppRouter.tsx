import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/Auth/Login';
import ProviderLogin from '../components/Auth/ProviderLogin'; // ✅ Import provider login
import ProviderRegister from '../components/Auth/ProviderRegister';
import Dashboard from '../components/Dashboard';
import PrivateRoute from './PrivateRoute';
import ProviderPrivateRoute from './ProviderPrivateRoute';
import ProviderDashboard from '../components/Dashboard/ProviderDashboard';
import Register from '../components/Auth/Register';
import AdminLogin from '../components/Auth/Admin/AdminLogin';
import AdminDashboard from '../components/Auth/Admin/AdminDashboard';
import AdminRoute from './AdminRoute';
import PendingProviders from '../components/Auth/Admin/PendingProviders';
import ApprovedProviders from '../components/Auth/Admin/ApprovedProviders';
import RejectedProviders from '../components/Auth/Admin/RejectedProviders';
const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* admin routes */}
          <Route
      path="/admin/dashboard"
      element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      }/>

      {/* admin route for pending provider */}
      <Route path="/admin/pending-providers" element={
  <AdminRoute>
    <PendingProviders />
  </AdminRoute>
} />
{/* admin route for approved providers */}
<Route path="/admin/approved-providers" element={<ApprovedProviders />} />
{/* admin route for rejected providers */}
<Route path="/admin/rejected-providers" element={<RejectedProviders />} />

      <Route path="/admin/login" element={<AdminLogin />} />

        {/* User Login Route */}
        <Route path="/login" element={<Login />} />

        {/* User register Route */}
        <Route path="/register" element={<Register />} />

        {/* ✅ Provider Login Route */}
        <Route path="/provider/login" element={<ProviderLogin />} />

        {/* ✅ Provider Register Route */}
        <Route path="/provider/register" element={<ProviderRegister />} />

        {/* Provider dashboard route */}
        <Route
  path="/provider/dashboard"
  element={
    <ProviderPrivateRoute>
      <ProviderDashboard />
    </ProviderPrivateRoute>
  }
/>
        {/* Protected user Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Fallback: Any unknown path will go to Login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
