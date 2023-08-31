import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { loginSchema, registerSchema } from "./auth.schema";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function login(data: z.infer<typeof loginSchema>) {
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  if (!user) return null;
  const isCorrectPassword = await bcrypt.compare(data.password, user.password);
  if (!isCorrectPassword) return null;
  return user;
}

export async function register(data: z.infer<typeof registerSchema>) {
  return await prisma.user.create({ data });
}
