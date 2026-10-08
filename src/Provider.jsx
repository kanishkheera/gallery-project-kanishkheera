import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";

export function Provider({ children }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ChakraProvider>
  );
}
