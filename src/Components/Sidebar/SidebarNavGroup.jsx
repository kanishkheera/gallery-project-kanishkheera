import { VStack } from "@chakra-ui/react";
import SidebarNavItem from "./SidebarNavItem";

export default function SidebarNavGroup({ items, onItemClick }) {
  return (
    <VStack w="90%" mx="auto" align="stretch" gap={2}>
      {items.map((item) => (
        <SidebarNavItem key={item.label} {...item} onItemClick={onItemClick} />
      ))}
    </VStack>
  );
}
