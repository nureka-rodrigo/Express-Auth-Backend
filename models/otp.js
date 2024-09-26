import mongoose from "mongoose";
const { Schema, model } = mongoose;

const otpSchema = new Schema({
  otp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
});

export const Otp = model("Otp", otpSchema);
