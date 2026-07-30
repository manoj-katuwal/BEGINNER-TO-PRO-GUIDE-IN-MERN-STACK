import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const registerUser = async (req, res) => {
  try {
    let { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "Username, email and password are required" });
    }

    username = username.trim();
    email = email.trim().toLowerCase();

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      const field = existingUser.username === username ? "Username" : "Email";
      return res.status(400).json({ message: `${field} is already taken` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("username email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: "Invalid user ID", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({ message: "Username/email and password are required" });
    }

    const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const payload = { id: user._id, username: user.username, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "secretkey", { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token, user: payload });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
