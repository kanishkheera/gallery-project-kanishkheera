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
import { IconButton } from "@chakra-ui/react";
import { HiOutlineMenu } from "react-icons/hi";
import { useState } from "react";
import { Drawer, Portal } from "@chakra-ui/react";
import SidebarContent from "./SidebarContent";
import SearchBar from "./SearchBar";
import FiltersBar from "./FiltersBar";

const menuItems = [
  { label: "All Photos", path: "/" },
  { label: "Albums", path: "/albums" },
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
    <>
      <Box
        position="sticky"
        top="0"
        zIndex="1000"
        bg="rgba(255,255,255,0.6)"
        backdropFilter="blur(20px)"
        WebkitBackdropFilter="blur(20px)"
        border="1px solid rgba(255,255,255,0.2)"
        boxShadow="sm"
        px={{ base: "2", lg: "4" }}
      >
        <Flex h="70px" align="center" justify="space-between">
          <HStack gap={1} align="center" flex={1} minW={0}>
            <IconButton
              display={{ base: "flex", xl: "none" }}
              variant="ghost"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              flexShrink={0}
            >
              <HiOutlineMenu />
            </IconButton>

            <Heading
              flex={1}
              minW={0}
              size={{ base: "lg", sm: "2xl" }}
              pb={{ base: "3px", sm: "7px" }}
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {currentPage}
            </Heading>
          </HStack>

          <HStack gap={6} mr={2} flexShrink={0}>
            <SearchBar />
            <FiltersBar />
          </HStack>
        </Flex>
      </Box>
      <Drawer.Root
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        placement="start"
      >
        <Portal>
          <Drawer.Backdrop bg="blackAlpha.700" />

          <Drawer.Positioner>
            <Drawer.Content maxW="260px">
              <Drawer.CloseTrigger asChild>
                <CloseButton position="absolute" top={4} right={4} />
              </Drawer.CloseTrigger>

              <SidebarContent onItemClick={() => setOpen(false)} />
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
}
