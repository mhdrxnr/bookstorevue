// src/axios.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000', // Update if your Laravel backend is hosted elsewhere
  withCredentials: true ,// Required for Sanctum cookies
  
})

export default api
