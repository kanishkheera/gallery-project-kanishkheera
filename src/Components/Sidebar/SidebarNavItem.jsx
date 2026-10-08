import { HStack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function SidebarNavItem({ icon: Icon, label, path, onItemClick }) {
  return (
    <NavLink to={path} onClick={onItemClick}>
      {({ isActive }) => (
        <HStack
          gap={3}
          p={3}
          borderRadius="md"
          cursor="pointer"
          bg={isActive ? "purple.100" : "transparent"}
          color={isActive ? "purple.600" : "inherit"}
          transition="0.2s"
          _hover={{ bg: "purple.100", color: "purple.600" }}
        >
          <Icon size={20} />
          <Text>{label}</Text>
        </HStack>
      )}
    </NavLink>
  );
}
