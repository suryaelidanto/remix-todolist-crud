import {
  Box,
  Button,
  Checkbox,
  Input,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { ActionArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { BsFillTrashFill } from "react-icons/bs";
import { createPostSchema } from "../modules/posts/posts.schema";
import {
  createPost,
  deletePost,
  getPosts,
} from "../modules/posts/posts.service";
import PostForm from "./PostForm";

export async function loader() {
  return await getPosts();
}

export async function action({ request }: ActionArgs) {
  if (request.method.toLowerCase() === "post") {
    const formData = await request.formData();
    const validatedData = createPostSchema.parse(Object.fromEntries(formData));

    await createPost(validatedData);
  }

  if (request.method.toLowerCase() === "delete") {
    const formData = await request.formData();
    const id = +(formData.get("id") as string);

    await deletePost(id);
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
              <Box display="flex" flex={10} gap={2}>
                <Checkbox />
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
