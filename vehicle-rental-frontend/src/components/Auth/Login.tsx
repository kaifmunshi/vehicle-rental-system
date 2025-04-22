import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/authService';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login({ email, password });

      // ✅ Store token and userId in localStorage
      localStorage.setItem('token', data.token);
      if (data.user?.id) {
        localStorage.setItem('userId', data.user.id);
      }

      navigate('/dashboard');
    } catch (error) {
      setLoginError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-left">
          <h2>Welcome Back 👋</h2>
          <p>Login to explore exciting rentals in your city.</p>
        </div>

        <div className="auth-right">
          <h2>Log in</h2>
          <p className="subtitle">Enter your credentials to continue</p>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Log in</button>

          {loginError && <p className="error-text">{loginError}</p>}

          <p className="footer-text">
            Don’t have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
