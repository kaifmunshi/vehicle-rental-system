// src/utils/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_USER_API_URL, // ✅ Now points to http://localhost:5000/api
  withCredentials: true, // ✅ Must include cookies/session
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`, // Optional, for fallback token-based auth
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
