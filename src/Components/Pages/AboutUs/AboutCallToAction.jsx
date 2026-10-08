import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { ABOUT_ACCENT } from "./aboutData";

export default function AboutCallToAction() {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align={{ base: "flex-start", md: "center" }}
      justify="space-between"
      gap={5}
      bg="#F4EDFF"
      borderRadius="3xl"
      p={{ base: 6, md: 9 }}
    >
      <VStack align="flex-start" gap={2}>
        <Heading size={{ base: "xl", md: "2xl" }}>Ready to explore?</Heading>
        <Text color="gray.700">Discover beautiful photography and find something worth saving.</Text>
      </VStack>
      <Button
        asChild
        bg={ABOUT_ACCENT}
        color="white"
        borderRadius="lg"
        size="lg"
        flexShrink={0}
        _hover={{ bg: "#7040BA", transform: "translateY(-2px)" }}
        transition="all 0.2s"
      >
        <Link to="/">
          Explore Gallery <FiArrowRight />
        </Link>
      </Button>
    </Flex>
  );
}
