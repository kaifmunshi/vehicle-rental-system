import React, { useState } from 'react';
import axios from 'axios';

type LoginResponse = {
  token: string;
  provider: {
    id: string;
    email: string;
  };
};

const ProviderLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const res = await axios.post('http://localhost:5002/api/provider/login', {
        email,
        password,
      });

      const { token, provider } = res.data as LoginResponse;

      if (!token || !provider || !provider.id) {
        throw new Error('Invalid login response structure.');
      }

      localStorage.setItem('providerToken', token);
      localStorage.setItem('providerEmail', provider.email);
      localStorage.setItem('providerId', provider.id);

      window.location.href = '/provider/dashboard';
    } catch (error: any) {
      if (error.response?.status === 403) {
        setErrorMessage('❌ Your account is pending, admin will approve it shortly.');
      } else {
        setErrorMessage('❌ Invalid credentials. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to top left, #f0f4ff, #e0e7ff)',
      padding: '20px',
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '40px 30px',
      borderRadius: '20px',
      boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
      maxWidth: '400px',
      width: '100%',
      textAlign: 'center' as const,
    },
    title: {
      fontSize: '28px',
      fontWeight: 700,
      fontFamily: `'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif`,
      color: '#1f2937',
      marginBottom: '30px',
    },
    input: {
      width: '100%',
      padding: '14px 18px',
      marginBottom: '18px',
      border: '1px solid #d1d5db',
      borderRadius: '50px',
      fontSize: '15px',
      backgroundColor: '#f9fafb',
      outline: 'none',
      boxSizing: 'border-box' as const,
    },
    button: {
      width: '100%',
      padding: '12px',
      background: 'linear-gradient(to right, #7c3aed, #9333ea)',
      color: '#fff',
      fontSize: '16px',
      border: 'none',
      borderRadius: '50px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    spinner: {
      width: '16px',
      height: '16px',
      border: '3px solid #fff',
      borderTop: '3px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    errorText: {
      marginTop: '15px',
      color: '#e11d48',
      fontWeight: 500,
    },
    registerPrompt: {
      marginTop: '20px',
      fontSize: '14px',
      color: '#4b5563',
    },
    registerLink: {
      marginLeft: '6px',
      color: '#7c3aed',
      fontWeight: 600,
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  };

  const injectSpinnerAnimation = () => {
    if (!document.getElementById('spinner-css')) {
      const style = document.createElement('style');
      style.id = 'spinner-css';
      style.innerHTML = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
  };
  injectSpinnerAnimation();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Provider Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.button, opacity: loading ? 0.8 : 1 }}
          >
            {loading ? (
              <>
                <div style={styles.spinner}></div>
                Logging in...
              </>
            ) : (
              ' Log in'
            )}
          </button>
        </form>

        {errorMessage && <p style={styles.errorText}>{errorMessage}</p>}

        <div style={styles.registerPrompt}>
          Don’t have an account?
          <span
            style={styles.registerLink}
            onClick={() => (window.location.href = '/provider/register')}
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProviderLogin;
