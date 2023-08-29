import { Button, FormControl, Input } from "@chakra-ui/react";
import { Form } from "@remix-run/react";

export default function PostForm() {
  return (
    <Form method="POST">
      <FormControl isRequired display="flex" gap={2}>
        <Input placeholder="Task to accomplished..." name="title" />
        <Button type="submit" colorScheme="whatsapp">
          SUBMIT
        </Button>
      </FormControl>
    </Form>
  );
}
