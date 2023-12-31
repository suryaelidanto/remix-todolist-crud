import {
  Box,
  Button,
  Input,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { ActionArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { AiFillCheckSquare, AiOutlineCheckSquare } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import {
  createPostSchema,
  updatePostSchema,
} from "../modules/posts/posts.schema";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../modules/posts/posts.service";
import PostForm from "../components/posts/PostForm";

export async function loader() {
  return await getPosts();
}

export async function action({ request }: ActionArgs) {
  if (request.method.toLowerCase() === "post") {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const isDone = false;

    const validatedData = createPostSchema.parse({
      title,
      isDone,
    });

    await createPost(validatedData);
  }

  if (request.method.toLowerCase() === "delete") {
    const formData = await request.formData();
    const id = +(formData.get("id") as string);

    await deletePost(id);
  }

  if (request.method.toLowerCase() === "patch") {
    const formData = await request.formData();

    const id = +(formData.get("id") as string);
    const isDone = (formData.get("isDone") as string) === "true" ? false : true;

    console.log(id, isDone);

    const validatedData = updatePostSchema.parse({
      id,
      isDone,
    });

    updatePost(validatedData);
  }

  return redirect("/posts");
}

export default function Posts() {
  const data = useLoaderData<typeof loader>();

  return (
    <Box margin="30px">
      <PostForm />
      <Box display="flex" width="100%" flexDirection="column" padding="20px">
        <Text>I promise to accomplish this : </Text>
        <UnorderedList listStyleType="none">
          {data.map((post) => (
            <ListItem
              key={post.id}
              display="flex"
              alignItems="center"
              gap={2}
              marginBottom="5px"
            >
              <Box display="flex" alignItems={"center"} flex={10} gap={2}>
                <Form method="PATCH">
                  <Input type="hidden" name="id" value={post.id} />
                  <Input
                    type="hidden"
                    name="isDone"
                    value={post.isDone.toString()}
                  />
                  {post.isDone ? (
                    <Button type="submit" variant={"ghost"}>
                      <AiFillCheckSquare style={{ color: "green" }} />
                    </Button>
                  ) : (
                    <Button type="submit" variant={"ghost"}>
                      <AiOutlineCheckSquare style={{ color: "green" }} />
                    </Button>
                  )}
                </Form>
                <Text>{post.title}</Text>
              </Box>
              <Box display="flex" flex={2} justifyContent="flex-end">
                <Form method="DELETE">
                  <Input type="hidden" name="id" value={post.id} />
                  <Button type="submit" colorScheme="red">
                    <BsFillTrashFill style={{ color: "white" }} />
                  </Button>
                </Form>
              </Box>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Box>
  );
}
