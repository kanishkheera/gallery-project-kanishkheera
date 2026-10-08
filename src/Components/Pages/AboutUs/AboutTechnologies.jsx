import { Box, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { technologies } from "./aboutData";
import { ABOUT_ACCENT } from "./aboutData";

export default function AboutTechnologies() {
  return (
    <VStack align="stretch" gap={7}>
      <VStack align="flex-start" gap={2}>
        <Heading size={{ base: "xl", md: "2xl" }}>Built with modern technology</Heading>
        <Text color="gray.600" fontSize={{ base: "md", md: "lg" }}>
          Technologies used to build the Gallery experience.
        </Text>
      </VStack>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4}>
        {technologies.map(({ icon: Icon, name, description }) => (
          <HStack
            key={name}
            align="flex-start"
            gap={4}
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="xl"
            p={5}
          >
            <Box color={ABOUT_ACCENT} flexShrink={0} mt={1}>
              <Icon size={22} />
            </Box>
            <VStack align="flex-start" gap={1} minW={0}>
              <Heading size="sm">{name}</Heading>
              <Text color="gray.600" fontSize="sm" lineHeight="1.6">
                {description}
              </Text>
            </VStack>
          </HStack>
        ))}
      </SimpleGrid>
    </VStack>
  );
}
