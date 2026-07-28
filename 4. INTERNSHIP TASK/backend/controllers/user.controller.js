const user = require("../models/user")


exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // 1. Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    // 2. Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // 4. Create and save the new user
    const newUser = new User({
      username,
      password // Save the hashed version, not the plain text
    });

    await newUser.save();

    // 5. Respond with success
    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, username: newUser.username },
    });

  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};