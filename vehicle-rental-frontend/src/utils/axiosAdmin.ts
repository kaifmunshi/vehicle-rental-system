import axios from 'axios';

const axiosAdmin = axios.create({
  baseURL: 'http://localhost:5001/api/admin', // ✅ correct path
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAdmin.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    config.headers = {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : '',
    };
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosAdmin;
