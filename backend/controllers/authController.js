import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username)
      return res.status(400).json({ message: "Email, password, and username are required" });

    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(400).json({ message: "Email already exists" });

    // Check if username already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists)
      return res.status(400).json({ message: "Username already exists" });

    // Validate username format (alphanumeric and underscores only, 3-20 characters)
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ 
        message: "Username must be 3-20 characters long and contain only letters, numbers, and underscores" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      email, 
      password: hashedPassword,
      username: username.toLowerCase() // Store username in lowercase for consistency
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, email: user.email, username: user.username },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password)
      return res.status(400).json({ message: "Email/username and password are required" });

    // Find user by email or username
    const user = await User.findOne({
      $or: [
        { email: emailOrUsername },
        { username: emailOrUsername.toLowerCase() }
      ]
    });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email, username: user.username },
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      message: "Profile retrieved successfully",
      user: { id: req.user._id, email: req.user.email, role: req.user.role, username: req.user.username },
    });
  } catch (error) {
    console.error("Profile error:", error.message);
    res.status(500).json({ message: "Failed to get profile", error: error.message });
  }
};

// Search users by username
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.length < 2) {
      return res.status(400).json({ message: "Search query must be at least 2 characters" });
    }

    const users = await User.find({
      username: { $regex: query, $options: 'i' }
    }).select('username email').limit(10);

    res.status(200).json(users);
  } catch (error) {
    console.error("Search error:", error.message);
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};

// Get user profile by username
export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select('username email createdAt');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Get user error:", error.message);
    res.status(500).json({ message: "Failed to get user", error: error.message });
  }
};

// Cleanup function to remove users with null usernames (for development only)
export const cleanupUsers = async (req, res) => {
  try {
    const result = await User.deleteMany({ username: null });
    res.status(200).json({
      message: "Cleanup completed",
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error("Cleanup error:", error.message);
    res.status(500).json({ message: "Cleanup failed", error: error.message });
  }
};
