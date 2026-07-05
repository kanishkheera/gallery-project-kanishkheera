import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { FilterProvider } from "./Components/context/FilterContext";
import { FavoritesProvider } from "./Components/context/FavoritesContext";
import { DeletedProvider } from "./Components/context/DeleteContext";

export function Provider({ children }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <FilterProvider>
        <FavoritesProvider>
          <DeletedProvider>{children}</DeletedProvider>
        </FavoritesProvider>
      </FilterProvider>
    </ChakraProvider>
  );
}
