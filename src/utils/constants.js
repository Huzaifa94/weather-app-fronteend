// src/api.js
import axios from 'axios';


const api = axios.create({
  baseURL: 'https://www.meteosource.com/api/v1/free',
  params: {
    key: 'aggszhcuarn2x3af8imreh5c7r2hjxxic02xlm8b', // Your API key
  },
});

export default api;
