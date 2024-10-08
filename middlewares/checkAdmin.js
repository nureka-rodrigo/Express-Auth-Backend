import jwt from "jsonwebtoken";
import {StatusCodes} from "http-status-codes";
import dotenv from "dotenv";
import {User} from "../models/user.js";

dotenv.config();

const checkAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId, null, null).exec();

    if (!user || user.role !== "admin") {
      return res.status(StatusCodes.FORBIDDEN).json({
        status: false,
        message: "Access denied. You do not have the required permissions.",
      });
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: "An error occurred while verifying token.",
    });
  }
};

export default checkAdmin;