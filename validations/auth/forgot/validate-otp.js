import { z } from "zod";

export const validateOtpSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" }),
  otp: z
    .string()
    .length(6, { message: "OTP must be exactly 6 characters long" }),
});