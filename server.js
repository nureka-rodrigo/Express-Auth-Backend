import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Enable CORS with specific origin and credentials
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Port and MongoDB URI
const PORT = process.env.PORT || 8000;
const URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(URI)
  .then(() => console.log("MongoDB Connection Success!"))
  .catch((e) => console.log(e));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
