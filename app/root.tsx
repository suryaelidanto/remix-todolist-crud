import { Outlet } from "@remix-run/react";
import { Document } from "./Document";
import { ChakraProvider } from "@chakra-ui/react";

export default function App() {
  return (
    <Document>
      <ChakraProvider>
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}
