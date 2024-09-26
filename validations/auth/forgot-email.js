import { z } from "zod";

export const forgotEmailSchema = z
  .object({
    email: z
    .string()
    .email({ message: "Invalid email address" }),
  })