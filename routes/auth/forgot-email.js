import express from "express";
import { User } from "../../models/user.js";
import { Otp } from "../../models/otp.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { forgotEmailSchema } from "../../validations/auth/forgot-email.js";
import { StatusCodes } from "http-status-codes";
import { sendMail } from "../../mail/nodemailer.js";

// Create a new router
const router = express.Router();

// POST /auth/forgot-email
router.post("/", validateData(forgotEmailSchema), async (req, res) => {
  // Extract the email from the request body
  const { email } = req.body;

  // Find the user by email
  const user = await User.findOne({ email: email }, null, null).exec();
  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: false, message: "Invalid email" });
  }

  // Generate a random OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Set OTP expiry time (e.g., 10 minutes from now)
  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  // Check if an OTP entry already exists for the email
  const existingOtp = await Otp.findOne({ email: email }, null, null).exec();
  if (existingOtp) {
    // Update the existing OTP entry
    existingOtp.otp = otp;
    existingOtp.expiry = expiry;
    await existingOtp.save();
  } else {
    // Create a new OTP entry
    const otpEntry = new Otp({ otp, email, expiry });
    await otpEntry.save();
  }

  // Send an email with the OTP
  await sendMail({
    from: process.env.NODEMAILER_FROM,
    to: email,
    subject: "Reset your email",
    html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
  });

  // Send a success response
  res.json({ status: true, message: "An OTP has been sent successfully" });
});

export default router;