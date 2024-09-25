import express from "express";

// Create a new router
const router = express.Router();

// POST /auth/logout
router.post("/", async (req, res) => {
  // Clear the token cookie
  res.clearCookie("token");

  // Send a success response
  res.json({ status: true, message: "Logout successful" });
});

export default router;
