import { Text, VStack } from "@chakra-ui/react";

export default function AboutFooter() {
  return (
    <VStack gap={1} pt={1}>
      <Text color="gray.700" fontWeight="semibold">Gallery by Kanishk Heera</Text>
      <Text color="gray.500" fontSize="sm">Explore • Organize • Discover</Text>
    </VStack>
  );
}
