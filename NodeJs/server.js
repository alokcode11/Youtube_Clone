import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User, comment, channel, videoModel } from "./Model/product.model.js";

const app = express();
app.use(cors());
app.use(express.json());

// **MongoDB Connection**
mongoose
  .connect("mongodb+srv://alokkumar082001:Alok11@cluster0.1jfqfmq.mongodb.net/")
  .then(() => console.log("Database connection successful..."))
  .catch((err) => console.error("Database connection error:", err));

const JWT_SECRET = "your_secret_key"; // Change this to a secure key

app.listen(4000, () => console.log("Server running on port 4000"));

//-------------------------------------------------------------------------------------------------------
// **JWT Authentication Middleware**
// **JWT Authentication Middleware**
function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token required" });

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: "Invalid JWT token" });
    req.user = payload;
    next();
  });
}

//-------------------------------------------------------------------------------------------------------
// **Generate Token**
app.post("/generateToken", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ message: "Email required to generate a token." });
  }
  const accessToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
  res
    .status(200)
    .json({ token: accessToken, message: "Token generated successfully!" });
});

//-------------------------------------------------------------------------------------------------------
// **User Registration**
app.post("/saveUserInformation", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // Hash Password Before Saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create New User
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      password: hashedPassword,
    });
  } catch (error) {
    res.status(500).json({ message: "Signup Failed", error: error.message });
  }
});
// **User Login**
app.post("/userLogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User doesn't exist. Please register." });
    }

    // **Generate JWT Token**
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // **Return Token and User Info**
    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        email: existingUser.email,
        firstname: existingUser.firstname,
        lastname: existingUser.lastname,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
});

//-------------------------------------------------------------------------------------------------------
// **Fetch User Data (Protected)**
app.get("/userData", authenticateUser, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to fetch users...", error: error.message });
  }
});

//-------------------------------------------------------------------------------------------------------
// **Save Comment**
app.post("/saveComment", async (req, res) => {
  try {
    const { commentData } = req.body;
    if (!commentData)
      return res.status(400).json({ message: "Comment data is required." });

    const newComment = new comment({ commentData });
    await newComment.save();
    res.status(201).json({ message: "Comment added successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding comment", error: error.message });
  }
});

//-------------------------------------------------------------------------------------------------------
// **Save Channel Data**
app.post("/saveChannelData", async (req, res) => {
  try {
    const { username, userhandle } = req.body;
    if (!username || !userhandle)
      return res.status(400).json({ message: "Name and handle are required." });

    const existingChannel = await channel.findOne({ userhandle });
    if (existingChannel)
      return res.status(409).json({ message: "Handle already exists." });

    const newChannel = new channel({ username, userhandle });
    await newChannel.save();
    res.status(201).json({ message: "Channel created successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving channel", error: error.message });
  }
});

//-------------------------------------------------------------------------------------------------------
// **Fetch Channel Data**
app.get("/channelData", async (req, res) => {
  try {
    const channels = await channel.find();
    res.status(200).json(channels);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to fetch channels...", error: error.message });
  }
});

//-------------------------------------------------------------------------------------------------------
// **Fetch Comments Data**
app.get("/commentsData", async (req, res) => {
  try {
    const comments = await comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to fetch comments...", error: error.message });
  }
});

//-------------------------------------------------------------------------------------------------------
// **Fetch Videos**
app.get("/videos", async (req, res) => {
  try {
    const videos = await videoModel.find();
    res.status(200).json(videos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to fetch videos...", error: error.message });
  }
});

//-------------------------------------------------------------------------------------------------------
