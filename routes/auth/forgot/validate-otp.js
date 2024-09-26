import express from "express";
import { Otp } from "../../../models/otp.js";
import { validateData } from "../../../middlewares/validationMiddleware.js";
import { validateOtpSchema } from "../../../validations/auth/forgot/validate-otp.js";
import { StatusCodes } from "http-status-codes";

// Create a new router
const router = express.Router();

// POST /auth//forgot-password/validate-otp
router.post("/", validateData(validateOtpSchema), async (req, res) => {
  // Extract the OTP and email from the request body
  const { otp, email } = req.body;

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

  // Send a success response
  res.json({ status: true, message: "OTP verified successfully" });
});

export default router;