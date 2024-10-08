import express from "express";
import {User} from "../../models/user.js";
import {StatusCodes} from "http-status-codes";

// Create a new router
const router = express.Router();

// GET /admin/dashboard
router.get("/", async (req, res) => {
  try {
    const usersCount = await User.countDocuments().exec();
    res.json({status: true, message: "Users retrieved successfully", data: {
      users: usersCount,
      }});
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: "An error occurred while retrieving dashboard data",
    });
  }
});

export default router;
