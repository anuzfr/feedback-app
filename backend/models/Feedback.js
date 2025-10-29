import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  from: { type: String, default: "Anonymous" },
  isPublic: { type: Boolean, default: false }, // true for public feedback, false for anonymous
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
