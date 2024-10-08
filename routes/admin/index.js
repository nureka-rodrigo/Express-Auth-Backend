import express from "express";
import dashboardRoute from "./dashboard.js";
import usersRoute from "./users.js";
import checkAdmin from "../../middlewares/checkAdmin.js";

// Create a new router
const router = express.Router();

// Middleware to check if the user is an admin
router.use(checkAdmin);

// Admin routes
router.use("/dashboard", dashboardRoute);
router.use("/users", usersRoute);

export default router;
