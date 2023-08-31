import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1),
  isDone: z.boolean().default(false),
});

export const updatePostSchema = z.object({
  id: z.number(),
  isDone: z.boolean(),
});
