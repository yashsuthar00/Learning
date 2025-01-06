import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL for your backend API
});

// Add an interceptor to include the Authorization header in every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Retrieve the JWT token from localStorage
        if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add the token to headers
        }
        return config;
    },    
  (error) => Promise.reject(error) // Handle any request errors
);

export default api;
