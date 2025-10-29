import express from "express";
import { getAllUsers, getAllFeedback, deleteUser, deleteFeedback } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/feedback", protect, adminOnly, getAllFeedback);
router.delete("/users/:id", protect, adminOnly, deleteUser);
router.delete("/feedback/:id", protect, adminOnly, deleteFeedback);

export default router;
