import { z } from "zod";

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" }),
  otp: z
    .string()
    .length(6, { message: "OTP must be exactly 6 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});