import { Button } from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import {searchDialog} from "./SearchDialog";



export default function SearchBar() {
  return (
    <>
      <Button
        onClick={() => searchDialog.open("form", { title: "Search Image" })}
        borderRadius="full"
        bg="#F4EEFF"
        color="#8550D3"
        _hover={{
          bg: "#E9DCFF",
          transform: "scale(1.05)",
        }}
      >
        <IoSearch size={25} cursor="pointer" />
      </Button>
      <searchDialog.Viewport />
    </>
  );
}