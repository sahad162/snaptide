const User = require("../database/models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { userName, email, password, dob } = req.body;

  if (!userName || !email || !password || !dob) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided." });
  }

  try {
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

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
      profileImage: "",
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: savedUser._id,
        userName: savedUser.userName,
        email: savedUser.email,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};



exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ error: "No user found with this email" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const payload = {
      id: existingUser._id,
      name: existingUser.userName,
    };

    const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '1h' }); // You may want to add an expiration time

    res.status(200).json({
      message: "User login successful",
      access_token: token,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

