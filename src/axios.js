// src/axios.js
// src/axios.js
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true
})

export const web = axios.create({
  baseURL: 'http://localhost:8000/',
  withCredentials: true
})

