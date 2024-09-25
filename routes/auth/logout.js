import express from "express";

// Create a new router
const router = express.Router();

// Register a new user
router.post("/", async (req, res) => {
  // Clear the token cookie
  res.clearCookie("token");

  // Send a success response
  res.json({ status: true, message: "Logout successful" });
});

export default router;
