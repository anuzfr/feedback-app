// src/api/authApi.js
import axios from "axios";
import { BASE_URL } from "./config";

// Create axios instance with proper configuration
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🟢 SIGNUP (Create new user)
export const signupUser = async (email, password, username) => {
  try {
    const res = await api.post('/auth/signup', { email, password, username });
    return res.data;
  } catch (error) {
    console.error("Signup API Error:", error.response?.data || error.message);
    throw error;
  }
};

// 🟢 LOGIN (Authenticate user)
export const loginUser = async (emailOrUsername, password) => {
  try {
    const res = await api.post('/auth/login', { emailOrUsername, password });
    return res.data;
  } catch (error) {
    console.error("Login API Error:", error.response?.data || error.message);
    throw error;
  }
};

// 🟢 GET PROFILE (protected route)
export const getUserProfile = async (token) => {
  try {
    const res = await api.get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error("Profile API Error:", error.response?.data || error.message);
    throw error;
  }
};

// 🟢 SEARCH USERS
export const searchUsers = async (query) => {
  try {
    const res = await api.get(`/auth/search?query=${encodeURIComponent(query)}`);
    return res.data;
  } catch (error) {
    console.error("Search users error:", error.response?.data || error.message);
    throw error;
  }
};

// 🟢 GET USER BY USERNAME
export const getUserByUsername = async (username) => {
  try {
    const res = await api.get(`/auth/user/${username}`);
    return res.data;
  } catch (error) {
    console.error("Get user error:", error.response?.data || error.message);
    throw error;
  }
};

// 🟢 LOGOUT (optional – just clear localStorage)
export const logoutUser = async () => {
  localStorage.removeItem("user");
};

