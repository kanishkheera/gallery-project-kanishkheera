import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { FilterProvider } from "./Components/context/FilterContext";

export function Provider({ children }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <FilterProvider>{children}</FilterProvider>
    </ChakraProvider>
  );
}
