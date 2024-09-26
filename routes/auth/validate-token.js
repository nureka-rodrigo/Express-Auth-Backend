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
  // Get the token from the cookie
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ status: false, message: "Unauthorized" });
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
    res.json({ status: true, user: user });
  } catch (e) {
    // Send an error response
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ status: false, message: "Unauthorized" });
  }
});

export default router;
