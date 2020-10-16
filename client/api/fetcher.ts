import axios from 'axios';

export const fetcher = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true
});
