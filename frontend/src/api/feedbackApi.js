// src/api/feedbackApi.js
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

// 🟢 Submit feedback to a user's public profile
export const submitFeedback = async (username, message, from = "Anonymous") => {
  try {
    const res = await api.post(`/feedback/${username}`, { message, from });
    return res.data;
  } catch (error) {
    console.error("Submit feedback error:", error.response?.data || error.message);
    throw error;
  }
};

// 🟢 Get all feedback for the logged-in user
export const getUserFeedback = async (token) => {
  try {
    const res = await api.get('/feedback/my-feedback', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Get feedback error:", error.response?.data || error.message);
    throw error;
  }
};

// 🟢 Get public feedback for a user
export const getPublicFeedback = async (username) => {
  try {
    const res = await api.get(`/feedback/public/${username}`);
    return res.data;
  } catch (error) {
    console.error("Get public feedback error:", error.response?.data || error.message);
    throw error;
  }
};

// 🟢 Delete feedback (optional)
export const deleteFeedback = async (id, token) => {
  try {
    const res = await api.delete(`/feedback/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Delete feedback error:", error.response?.data || error.message);
    throw error;
  }
};
