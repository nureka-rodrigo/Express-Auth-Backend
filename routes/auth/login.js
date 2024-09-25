import express from "express";
import { User } from "../../models/user.js";
import bcrypt from "bcrypt";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { loginSchema } from "../../validations/auth/login.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Create a new router
const router = express.Router();

// Load environment variables from .env file
dotenv.config();

// Initialize JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

// Register a new user
router.post("/", validateData(loginSchema), async (req, res) => {
  // Extract the email and password from the request body
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email: email }, null, null).exec();
  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: false, message: "Invalid credentials" });
  }

  // Compare the provided password with the stored hashed password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: false, message: "Invalid credentials" });
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "3h" });

  // Set the token in a cookie
  res.cookie("token", token, {
    secure: process.env.NODE_ENV === "production",
    maxAge: 3 * 60 * 60 * 1000,
  });

  // Send a success response
  res.json({
    status: true,
    message: "Login successful",
    token,
    role: user.role,
  });
});

export default router;
