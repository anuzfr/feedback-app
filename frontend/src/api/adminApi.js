// src/api/adminApi.js
import axios from "axios";
import { BASE_URL } from "./config";

// 🟢 Get all users (for admin view)
export const getAllUsers = async (token) => {
  const res = await axios.get(`${BASE_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 🟢 Delete user (for admin panel)
export const deleteUser = async (userId, token) => {
  const res = await axios.delete(`${BASE_URL}/admin/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
