import { Box, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { features } from "./aboutData";
import { ABOUT_ACCENT } from "./aboutData";

export default function AboutFeatures() {
  return (
    <VStack align="stretch" gap={7}>
      <VStack align="flex-start" gap={2}>
        <Heading size={{ base: "xl", md: "2xl" }}>Everything you need to explore</Heading>
        <Text color="gray.600" fontSize={{ base: "md", md: "lg" }}>
          Simple tools designed to make photo discovery and organization easier.
        </Text>
      </VStack>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>
        {features.map(({ icon: Icon, title, description }) => (
          <VStack
            key={title}
            align="flex-start"
            gap={3}
            minH={{ base: "auto", md: "190px" }}
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="2xl"
            p={{ base: 5, md: 6 }}
            transition="all 0.2s ease"
            _hover={{ borderColor: "#C9A9F2", transform: "translateY(-3px)" }}
          >
            <Box color={ABOUT_ACCENT} bg="#F4EDFF" borderRadius="xl" p={3}>
              <Icon size={21} />
            </Box>
            <Heading size="md">{title}</Heading>
            <Text color="gray.600" lineHeight="1.65" fontSize="sm">
              {description}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </VStack>
  );
}
