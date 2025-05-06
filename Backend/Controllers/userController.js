const User = require("../database/models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { userName, email, password, dob ,name} = req.body;

  if (!userName || !email || !password || !dob || !name) {
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
      name,
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

    const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '7h' }); 
    res.status(200).json({
      message: "User login successful",
      access_token: token,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getusers = async (req, res) => {
  try {
    const currentUserId = req.user?.id; 

    if (!currentUserId) {
      return res.status(401).json({ error: 'Unauthorized: No user ID found' });
    }

    // Exclude the current user from suggestions
    const users = await User.find({ _id: { $ne: currentUserId } })
      .select('-password')
      .limit(5);

    res.status(200).json({ users });
  } catch (err) {
    console.error("Error in getusers:", err);
    res.status(500).json({ error: "Error while getting users" });
  }
};


exports.togglefollow = async (req, res) => {
  const { userId } = req.body;
  const loggedInUserId = req.user.id;


  // Prevent following self
  if (userId == loggedInUserId) {
    return res.status(400).json({ message: "You can't follow yourself" });
  }

  try {
    const currentUser = await User.findById(loggedInUserId);
    const targetedUser = await User.findById(userId);

    
    if (!targetedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the logged-in user exists
    if (!currentUser) {
      return res.status(404).json({ message: "Logged-in user not found" });
    }

    const isFollowing = currentUser.following.includes(userId);
    
    if (isFollowing) {
      currentUser.following.pull(userId);
      targetedUser.followers.pull(loggedInUserId);
    } else {
      currentUser.following.push(userId);
      targetedUser.followers.push(loggedInUserId);
    }

    await currentUser.save();
    await targetedUser.save();

    return res.status(200).json({
      message: isFollowing ? "Unfollowed successfully" : "Followed successfully",
    });
  } catch (err) {
    console.error("Follow toggle error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
