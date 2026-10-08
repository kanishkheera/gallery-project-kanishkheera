import { Heading, Image, Text, VStack } from "@chakra-ui/react";

export default function AboutDeveloper() {
  return (
    <VStack align="center" textAlign="center" gap={4} py={{ base: 2, md: 5 }}>
      <Image
        src="/kanishk-heera.jpg"
        alt="Kanishk Heera"
        boxSize={{ base: "160px", md: "200px" }}
        objectFit="cover"
        borderRadius="full"
        border="3px solid #8550D3"
        p="2px"
      />
      <Heading size={{ base: "xl", md: "2xl" }}>Designed &amp; Developed by Kanishk Heera</Heading>
      <Text color="gray.600" lineHeight="1.8" maxW="760px">
        Gallery is a frontend project created to explore modern React development, API
        integration, responsive UI design, photo organization, and interactive user experiences.
      </Text>
    </VStack>
  );
}
