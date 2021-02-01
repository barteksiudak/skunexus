import axios from 'axios';
import { BASE_URL } from '../config.json';

const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
});

export default http;
