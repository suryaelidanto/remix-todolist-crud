import { Button, FormControl, Input } from "@chakra-ui/react";
import { Form, useNavigation } from "@remix-run/react";

export default function PostForm() {
  const { state } = useNavigation();

  return (
    <Form method="POST">
      <FormControl isRequired display="flex" gap={2}>
        <Input placeholder="Task to accomplished..." name="title" autoFocus />
        <Button type="submit" colorScheme="whatsapp">
          {state === "submitting" ? "Submitting..." : "Submit"}
        </Button>
      </FormControl>
    </Form>
  );
}
