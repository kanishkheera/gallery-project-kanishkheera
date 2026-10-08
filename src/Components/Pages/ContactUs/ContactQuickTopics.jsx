import { Box, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { quickTopics } from "./contactData";
import { CONTACT_ACCENT } from "./contactData";

export default function ContactQuickTopics() {
  return (
    <SimpleGrid columns={{ base: 1, sm: 3 }} gap={4}>
      {quickTopics.map(({ icon: Icon, title, description }) => (
        <HStack
          key={title}
          align="flex-start"
          gap={4}
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="xl"
          p={{ base: 3, md: 5 }}
          transition="border-color 0.2s"
          _hover={{ borderColor: "#C9A9F2" }}
        >
          <Box color={CONTACT_ACCENT} mt={1} flexShrink={0}><Icon size={20} /></Box>
          <VStack align="flex-start" gap={1} minW={0}>
            <Heading size="sm">{title}</Heading>
            <Text color="gray.600" fontSize="sm">{description}</Text>
          </VStack>
        </HStack>
      ))}
    </SimpleGrid>
  );
}
