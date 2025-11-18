// In client/src/api/axios.ts
// In client/src/api/axios.ts
import axios from 'axios';

// This creates a new instance of axios with a base URL.
// import.meta.env.VITE_API_URL will be replaced by Vite:
// - On your local machine, it will become 'http://localhost:5000'.
// - On Vercel, it will become the value you set in the Vercel dashboard.
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default API;