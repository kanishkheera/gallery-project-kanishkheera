import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { FiImage } from "react-icons/fi";
import { ABOUT_ACCENT } from "./aboutData";

export default function AboutUnsplash() {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align={{ base: "flex-start", md: "center" }}
      justify="space-between"
      gap={6}
      bg="#F6F1FC"
      border="1px solid"
      borderColor="#E9DDF8"
      borderRadius="3xl"
      p={{ base: 6, md: 9 }}
    >
      <VStack align="flex-start" gap={3} maxW="760px">
        <Text color={ABOUT_ACCENT} fontWeight="bold" letterSpacing="0.1em" fontSize="xs">
          PHOTO DISCOVERY POWERED BY UNSPLASH
        </Text>
        <Heading size={{ base: "xl", md: "2xl" }}>Powered by Unsplash</Heading>
        <Text color="gray.600" lineHeight="1.8">
          Gallery uses the Unsplash API to bring high-quality photography into the application.
          This makes it possible to discover photographs across different subjects, styles,
          places, and ideas through a single browsing experience.
        </Text>
      </VStack>
      <Box color={ABOUT_ACCENT} flexShrink={0} alignSelf={{ base: "flex-end", md: "center" }}>
        <FiImage size={54} />
      </Box>
    </Flex>
  );
}
