import {
  Button,
  Dialog,
  Input,
  Portal,
  Stack,
  createOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const searchDialog = createOverlay((props) => {
  const { title, ...rest } = props;
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    navigate(`/search?query=${encodeURIComponent(name.trim())}`);
    props.onOpenChange?.({ open: false });
  };

  return (
    <Dialog.Root {...rest}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            w={{
              base: "95%",
              sm: "90%",
              md: "500px",
              lg: "550px",
            }}
            borderRadius="20px"
            p={2}
            bg="white"
            border="1px solid"
            borderColor="#F1E9FF"
          >
            {title && (
              <Dialog.Header pb={2}>
                <Dialog.Title color="#6D3CC8" fontSize="xl" fontWeight="700">
                  {title}
                </Dialog.Title>
              </Dialog.Header>
            )}

            <Dialog.Body>
              <form onSubmit={handleSubmit}>
                <Stack gap="4">
                  <Input
                    placeholder="Find your image..."
                    border="2px solid"
                    borderColor="#E8DDFB"
                    borderRadius="12px"
                    _focus={{
                      borderColor: "#8550D3",
                      boxShadow: "0 0 0 4px rgba(133,80,211,.15)",
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <Button
                    type="submit"
                    w="full"
                    h="48px"
                    bg="linear-gradient(135deg, #9F6BFF 0%, #8550D3 100%)"
                    color="white"
                    borderRadius="12px"
                    fontWeight="600"
                    transition="all .25s"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 25px rgba(133,80,211,.35)",
                      bg: "linear-gradient(135deg, #AE7BFF 0%, #9160DB 100%)",
                    }}
                    _active={{
                      transform: "scale(.98)",
                    }}
                  >
                    Search
                  </Button>
                </Stack>
              </form>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

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