import { Box, Flex, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { discoveryLabels } from "./aboutData";
import { ABOUT_ACCENT } from "./aboutData";

export default function AboutOverview() {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 6, lg: 12 }} alignItems="center">
      <VStack align="flex-start" gap={4}>
        <Heading size={{ base: "xl", md: "2xl" }}>A little about Gallery</Heading>
        <Text color="gray.600" lineHeight="1.85" fontSize={{ base: "md", md: "lg" }}>
          Gallery brings photography discovery and organization together in one clean interface.
          Powered by the Unsplash API, the application lets you explore photographs, search for
          images, save favorites, create albums, revisit recently added photos, and share photos
          through a simple and intuitive experience.
        </Text>
      </VStack>
      <Flex gap={{ base: 2, sm: 3 }} wrap="wrap" justify={{ base: "flex-start", lg: "flex-end" }}>
        {discoveryLabels.map((label, index) => (
          <Flex
            key={label}
            align="center"
            gap={2}
            bg={index % 2 === 0 ? "#F4EDFF" : "purple.50"}
            color={ABOUT_ACCENT}
            borderRadius="full"
            px={{ base: 3, md: 4 }}
            py={2.5}
            fontWeight="semibold"
            fontSize={{ base: "sm", md: "md" }}
          >
            <Box w="6px" h="6px" bg={ABOUT_ACCENT} borderRadius="full" />
            <Text>{label}</Text>
          </Flex>
        ))}
      </Flex>
    </SimpleGrid>
  );
}
