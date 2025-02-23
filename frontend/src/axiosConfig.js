
import axios from 'axios';

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: 'http://localhost:5500/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


export default axiosInstance;
