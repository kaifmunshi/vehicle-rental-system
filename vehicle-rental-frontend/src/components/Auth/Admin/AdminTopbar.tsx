import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminTopbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="admin-glass-topbar">
      <div className="admin-title">
        <span role="img" aria-label="dashboard" className="emoji">👨‍💼</span>
        <h2>Admin Dashboard</h2>
      </div>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminTopbar;
