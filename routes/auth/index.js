import express from "express";
import signUpRoute from "./sign-up.js";
import signInRoute from "./sign-in.js";
import logoutRoute from "./logout.js";
import validateToken from "./validate-token.js";

// Create a new router
const router = express.Router();

// Authentication routes
router.use("/sign-up", signUpRoute);
router.use("/sign-in", signInRoute);
router.use("/logout", logoutRoute);
router.use("/validate-token", validateToken);

export default router;
