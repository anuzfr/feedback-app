import express from "express";
import { submitFeedback, getMyFeedback, getPublicFeedback } from "../controllers/feedbackController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:username", submitFeedback); // public
router.get("/my-feedback", protect, getMyFeedback); // private
router.get("/public/:username", getPublicFeedback); // public feedback for a user

export default router;
