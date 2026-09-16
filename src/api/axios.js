import axios from 'axios';

// Create an Axios instance with the deployed backend base URL
const api = axios.create({
    baseURL: 'https://lms-backend-production-8f33.up.railway.app/api', // Railway production backend URL
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