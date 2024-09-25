import express from "express";
import registerRoute from "./register.js";

// Create a new router
const router = express.Router();

// Authentication routes
router.use("/register", registerRoute);

export default router;
