import express from "express";
import {Otp} from "../../../models/otp.js";
import {User} from "../../../models/user.js";
import {validateData} from "../../../middlewares/validationMiddleware.js";
import {resetPasswordSchema} from "../../../validations/auth/forgot/reset-password.js";
import {StatusCodes} from "http-status-codes";
import bcrypt from "bcrypt";

// Create a new router
const router = express.Router();

// POST /auth//forgot-password/validate-otp
router.post("/", validateData(resetPasswordSchema), async (req, res) => {
  // Extract the OTP and email from the request body
  const { email, otp, password } = req.body;

  // Check if the OTP exists for the email
  const dbOtp = await Otp.findOne({ email: email, otp: otp }, null, null).exec();
  if (!dbOtp) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: false, message: "Invalid OTP" });
  }

  // Check if the OTP is expired
  if (dbOtp.expiry < new Date()) {
    // Delete the OTP from the database
    await Otp.deleteOne({ email: email, otp: otp }).exec();

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: false, message: "OTP expired" });
  }

  // Update the password in the database
  const user = await User.findOne({ email: email }, null, null).exec();
  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: false, message: "User not found" });
  }

  user.password = await bcrypt.hash(password, 10);
  await user.save();

  // Delete the OTP from the database
  await Otp.deleteOne({ email: email, otp: otp }).exec();

  // Send a success response
  res.json({ status: true, message: "Password has been reset successfully" });
});

export default router;