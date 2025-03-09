import axios from "axios";

import {BASE_URL} from './lib/constants' // Change this to your actual backend URL

// ✅ Axios Instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('jwt');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Register User Function
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/user/register", userData);
    return response.data; // Return API response
  } catch (error) {
    throw error.response?.data?.message || "Registration failed"; // Handle API error
  }
};

export default api;