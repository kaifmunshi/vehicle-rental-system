// D:\vehicle-rental-frontend\src\components\Auth\Admin\AdminLogin.tsx
import React, { useState } from 'react';
import axiosAdmin from '../../../utils/axiosAdmin';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const res = await axiosAdmin.post<{ token: string }>('/login', { email, password });
        localStorage.setItem('adminToken', res.data.token);
        
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError('Invalid credentials or login failed.');
    }
  };

  return (
    <div className="admin-login-container">
  <div className="admin-login-box">
    <h2>Admin Login</h2>
    {error && <p className="error-msg">{error}</p>}
    <form className="admin-login-form" onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  </div>
</div>

  
  );
};

export default AdminLogin;
