import express from "express";
import { User } from "../../models/user.js";
import bcrypt from "bcrypt";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { loginSchema } from "../../validations/auth/login.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Create a new router
const router = express.Router();

// POST /admin/users
router.get("/", async (req, res) => {
  try {
    const users = await User.find(null, "-password", null).exec();
    res.json({ status: true, message: "Users retrieved successfully", data: users });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: "An error occurred while retrieving users",
    });
  }
});

// DELETE /admin/users
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete({ _id: id }, null).exec();
    res.json({ status: true, message: "User deleted successfully" });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: "An error occurred while deleting user",
    });
  }
});

export default router;
