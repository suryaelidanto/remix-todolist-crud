import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { createPostSchema, updatePostSchema } from "./posts.schema";

const prisma = new PrismaClient();

export async function getPosts() {
  return await prisma.post.findMany({
    orderBy: {
      id: "desc",
    },
  });
}

export async function createPost(data: z.infer<typeof createPostSchema>) {
  return await prisma.post.create({ data });
}

export async function updatePost(data: z.infer<typeof updatePostSchema>) {
  return await prisma.post.update({ data, where: { id: data.id } });
}

export async function deletePost(id: number) {
  return await prisma.post.delete({
    where: {
      id,
    },
  });
}
