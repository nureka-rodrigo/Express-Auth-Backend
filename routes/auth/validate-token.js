import express from "express";
import { User } from "../../models/user.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Create a new router
const router = express.Router();

// Load environment variables from .env file
dotenv.config();

// Initialize JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

// POST /auth/validate-token
router.post("/", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID and exclude the password field
    const user = await User.findById(
      decoded.userId,
      "firstName lastName email role",
      null
    ).exec();

    // Send the user details
    res.json({ status: true, message: "Token is valid", user: user });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: "An error occurred while verifying token.",
    });
  }
});

export default router;
