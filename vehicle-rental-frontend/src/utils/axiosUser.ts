// src/utils/axiosUser.ts
import axios from 'axios';

const axiosUser = axios.create({
  baseURL: process.env.REACT_APP_USER_API_URL || 'http://localhost:5000/api/users',
  withCredentials: true, // ✅ Put it INSIDE axios.create()
});

axiosUser.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// axiosUser.interceptors.response.use(
//   res => res,
//   err => {
//     if (err.response && err.response.status === 401) {
//       alert("Session expired. Please login again.");
//       localStorage.clear();
//       window.location.href = '/login';
//     }
//     return Promise.reject(err);
//   }
// );
export default axiosUser;
