const User = require('../database/models/userModel');
const bcrypt = require('bcryptjs'); 

exports.registerUser = async (req, res) => {
  const { userName, email, password, dob } = req.body;

  if (!userName || !email || !password || !dob) {
    return res.status(400).json({ error: "All required fields must be provided." });
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });

    if (existingUser) {
      return res.status(409).json({ error: "User already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName: userName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      dob,
      bio: "",
      gender: "",
      profileImage: ""
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: savedUser._id,
        userName: savedUser.userName,
        email: savedUser.email
      }
    });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};
