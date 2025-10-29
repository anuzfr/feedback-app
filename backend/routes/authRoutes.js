import express from "express";
import { registerUser, loginUser, getProfile, cleanupUsers, searchUsers, getUserByUsername } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateToken, getProfile);
router.get("/search", searchUsers);
router.get("/user/:username", getUserByUsername);
router.delete("/cleanup", cleanupUsers); // Development only

export default router;
