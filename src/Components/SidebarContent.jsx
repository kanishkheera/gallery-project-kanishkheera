import { Heading, HStack, Image, Separator, VStack } from "@chakra-ui/react";
import SidebarNavGroup from "./Sidebar/SidebarNavGroup";
import {
  deletedSidebarItems,
  infoSidebarItems,
  primarySidebarItems,
} from "./Sidebar/sidebarItems";

export default function SidebarContent({ onItemClick }) {
  return (
    <VStack align="stretch" gap={4} minH="calc(100dvh - 24px)">
      <HStack>
        <Image src="/logo.png" w="100px" flexShrink={0} />
        <VStack gap="1px" minW={0}>
          <Heading size="2xl" as="h1">Gallery</Heading>
          <Heading size="lg" as="h3">by Kanishk</Heading>
        </VStack>
      </HStack>

      <SidebarNavGroup items={primarySidebarItems} onItemClick={onItemClick} />
      <Separator />
      <SidebarNavGroup items={deletedSidebarItems} onItemClick={onItemClick} />
      <Separator />
      <SidebarNavGroup items={infoSidebarItems} onItemClick={onItemClick} />
    </VStack>
  );
}
