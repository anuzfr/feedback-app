import Feedback from "../models/Feedback.js";
import User from "../models/User.js";

export const submitFeedback = async (req, res) => {
  try {
    const { username } = req.params;
    const { message, from } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPublic = from && from !== "Anonymous";
    
    const feedback = await Feedback.create({
      toUser: user._id,
      message,
      from: from || "Anonymous",
      isPublic: isPublic,
    });

    res.json(feedback);
  } catch (error) {
    console.error("Submit feedback error:", error.message);
    res.status(500).json({ message: "Failed to submit feedback", error: error.message });
  }
};

export const getMyFeedback = async (req, res) => {
  const feedback = await Feedback.find({ toUser: req.user._id }).sort({ createdAt: -1 });
  res.json(feedback);
};

export const getPublicFeedback = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get only public feedback for public display
    const feedback = await Feedback.find({ 
      toUser: user._id,
      isPublic: true
    }).sort({ createdAt: -1 });
    
    res.json(feedback);
  } catch (error) {
    console.error("Get public feedback error:", error.message);
    res.status(500).json({ message: "Failed to get feedback", error: error.message });
  }
};
