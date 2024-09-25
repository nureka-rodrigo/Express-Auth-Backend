import express from "express";
import registerRoute from "./register.js";
import loginRoute from "./login.js";
import logoutRoute from "./logout.js";

// Create a new router
const router = express.Router();

// Authentication routes
router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/logout", logoutRoute);

export default router;
