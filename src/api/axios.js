import axios from 'axios';

// Automatically choose the baseURL based on environment (Local development vs Production)
// import.meta.env.PROD is true when built for production (Vercel) and false during local dev (npm run dev)
const baseURL = import.meta.env.PROD 
    ? 'https://lms-backend-production-8f33.up.railway.app/api' // Live Railway backend URL for production
    : 'http://localhost:5000/api';                              // Localhost backend URL for development

// Create an Axios instance with the dynamic base URL
const api = axios.create({
    baseURL,
});

// Automatically attach JWT token to every request if user is logged in
api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

export default api;