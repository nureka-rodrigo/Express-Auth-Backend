import express from "express";
import registerRoute from "./register.js";
import loginRoute from "./login.js";

// Create a new router
const router = express.Router();

// Authentication routes
router.use("/register", registerRoute);
router.use("/login", loginRoute);

export default router;
