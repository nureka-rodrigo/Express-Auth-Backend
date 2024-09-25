import express from "express";
import registerRoute from "./register.js";
import loginRoute from "./login.js";
import logoutRoute from "./logout.js";
import validateToken from "./validate-token.js";

// Create a new router
const router = express.Router();

// Authentication routes
router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/logout", logoutRoute);
router.use("/validate-token", validateToken);

export default router;
