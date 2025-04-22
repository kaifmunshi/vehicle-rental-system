import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_API_URL,
});

export default axiosPublic;
