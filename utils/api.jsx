import axios from 'axios';

// You can replace this with your actual base URL or use an environment variable
const BASE_URL = 'https://air-quality-back-end-v2.vercel.app';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add other headers if needed (e.g., authorization tokens)
  },
});

// You can export the `api` instance or specific methods
export default api;
