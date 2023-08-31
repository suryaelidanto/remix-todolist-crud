import { Button, FormControl, Input } from "@chakra-ui/react";
import { Form, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";

export default function PostForm() {
  const { state } = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state === "submitting") formRef.current?.reset();
  }, [state]);

  return (
    <Form method="POST" ref={formRef}>
      <FormControl isRequired display="flex" gap={2}>
        <Input placeholder="Task to accomplished..." name="title" autoFocus />
        <Button type="submit" colorScheme="whatsapp">
          {state === "submitting" ? "Submitting..." : "Submit"}
        </Button>
      </FormControl>
    </Form>
  );
}
