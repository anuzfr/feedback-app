import User from "../models/User.js";
import Feedback from "../models/Feedback.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const getAllFeedback = async (req, res) => {
  const feedback = await Feedback.find().populate("toUser", "email username");
  res.json(feedback);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

export const deleteFeedback = async (req, res) => {
  await Feedback.findByIdAndDelete(req.params.id);
  res.json({ message: "Feedback deleted" });
};
