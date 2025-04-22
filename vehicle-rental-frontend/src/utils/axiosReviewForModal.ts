// D:\vehicle-rental-frontend\src\utils\axiosReviewForModal.ts
import axios from 'axios';

const axiosReview = axios.create({
  baseURL: 'http://localhost:5002/api', // review service base URL
  withCredentials: true,
});

export default axiosReview;
