import {
  Box,
  CloseButton,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { LuFilter } from "react-icons/lu";
import { IoMdMore } from "react-icons/io";
import { IconButton } from "@chakra-ui/react";
import { HiOutlineMenu } from "react-icons/hi";
import { useState } from "react";
import { Drawer, Portal } from "@chakra-ui/react";
import SidebarContent from "./SidebarContent";

const menuItems = [
  { label: "All Photos", path: "/" },
  { label: "Albums", path: "/albums" },
  { label: "Folders", path: "/folders" },
  { label: "Favorites", path: "/favorites" },
  { label: "Recently Added", path: "/recent" },
  { label: "Deleted Items", path: "/trash" },
  { label: "Settings", path: "/settings" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const currentPage =
    menuItems.find((item) => item.path === location.pathname)?.label ||
    "Gallery";

  return (
    <Box
      position="sticky"
      top="0"
      left="0"
      w="100%"
      zIndex="999"
      bg="rgba(255, 255, 255, 0.75)"
      backdropFilter="blur(20px)"
      WebkitBackdropFilter="blur(20px)"
      borderBottom="1px solid"
      borderColor="gray.200"
      boxShadow="sm"
    >
      <Flex h="70px" px={6} align="center" justify="space-between">
        <HStack gap={3}>
          <IconButton
            display={{ base: "flex", xl: "none" }}
            variant="ghost"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <HiOutlineMenu />
          </IconButton>

          <VStack gap={0} align="flex-start">
            <Heading size="2xl">{currentPage}</Heading>
            <Text color="gray.500">Total Items</Text>
          </VStack>
        </HStack>

        <HStack gap={5}>
          <IconButton variant="ghost" rounded="full">
            <IoSearch size={22} />
          </IconButton>

          <IconButton variant="ghost" rounded="full">
            <LuFilter size={22} />
          </IconButton>

          <IconButton variant="ghost" rounded="full">
            <IoMdMore size={22} />
          </IconButton>
        </HStack>
      </Flex>
    </Box>
  );
}
