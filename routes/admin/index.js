import express from "express";
import dashboardRoute from "./dashboard.js";
import usersRoute from "./users.js";

// Create a new router
const router = express.Router();

// Admin routes
router.use("/dashboard", dashboardRoute);
router.use("/users", usersRoute);

export default router;
