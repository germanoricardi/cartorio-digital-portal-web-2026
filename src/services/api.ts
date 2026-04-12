import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3010/v1',
  timeout: 10000, // 10s
  headers: {
    'Content-Type': 'application/json',
  },
});