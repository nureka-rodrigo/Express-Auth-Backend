import express from "express";
import signUpRoute from "./sign-up.js";
import signInRoute from "./sign-in.js";
import logoutRoute from "./logout.js";
import validateTokenRoute from "./validate-token.js";
import validateEmailRoute from "./forgot/validate-email.js";
import validateOtpRoute from "./forgot/validate-otp.js";
import resetPasswordRoute from "./forgot/reset-password.js";

// Create a new router
const router = express.Router();

// Authentication routes
router.use("/sign-up", signUpRoute);
router.use("/sign-in", signInRoute);
router.use("/logout", logoutRoute);
router.use("/validate-token", validateTokenRoute);
router.use("/forgot-password/validate-email", validateEmailRoute);
router.use("/forgot-password/validate-otp", validateOtpRoute);
router.use("/forgot-password/reset-password", resetPasswordRoute);

export default router;
