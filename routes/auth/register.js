import express from "express";
import { User } from "../../models/user.js";
import bcrypt from "bcrypt";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { registerSchema } from "../../validations/auth/register.js";
import { StatusCodes } from "http-status-codes";

// Create a new router
const router = express.Router();

// POST /auth/register
router.post("/", validateData(registerSchema), async (req, res) => {
  // Extract the user details from the request body
  const { firstName, lastName, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email: email }, null, null).exec();
  if (existingUser) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: false, message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: "user",
  });

  // Save the user to the database
  await user.save();

  // Send a success response
  res.json({ status: true, message: "User created successfully" });
});

export default router;
