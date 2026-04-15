import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  timeout: 10000, // 10s
  headers: {
    'Content-Type': 'application/json',
  },
});