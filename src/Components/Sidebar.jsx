import { Box } from "@chakra-ui/react";
import SidebarContent from "./SidebarContent";

export default function Sidebar() {
  return (
    <Box
      display={{ base: "none", xl: "block" }}
      w="260px"
      h="100vh"
      bg="gray.100"
      p={3}
      position="fixed"
      left="0"
      top="0"
    >
      <SidebarContent/>
    </Box>
  );
}