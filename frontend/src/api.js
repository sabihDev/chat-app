import axios from "axios";
import { BASE_URL } from "./lib/constants"; // ✅ Ensure BASE_URL is correctly set

// ✅ Axios Instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach Authorization Token if exists
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("jwt");
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
    return response.data; // ✅ Return API response
  } catch (error) {
    throw error.response?.data?.message || "Registration failed"; // ✅ Handle API error
  }
};

// ✅ Login User Function
export const loginUser = async (userData) => {
  try {
    const response = await api.post("/user/login", userData);
    return response; // ✅ Return API response
  } catch (error) {
    throw error.response?.data?.message || "Registration failed"; // ✅ Handle API error
  }
};

// ✅ Get User Details Function (Using API instance)
export const getUserDetails = async () => {
  try {
    const response = await api.get("/user/details"); // ✅ GET request instead of POST
    console.log(response.data);

    return response.data; // ✅ Return user details

  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user details";
  }
};

export default api;
