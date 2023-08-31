import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  password: z.string(),
});
