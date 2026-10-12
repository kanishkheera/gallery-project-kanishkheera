import { Button, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { CONTACT_ACCENT } from "./contactData";

export default function ContactFooter() {
  const scrollToContactForm = (event) => {
    event.preventDefault();

    const form = document.getElementById("contact-form");
    if (!form) return;

    const header = document.querySelector("[data-scroll-header]");
    const headerHeight = header?.getBoundingClientRect().height ?? 0;
    const gap = Number.parseFloat(window.getComputedStyle(form).scrollMarginTop) || 0;
    const destination = Math.max(
      0,
      window.scrollY + form.getBoundingClientRect().top - headerHeight - gap,
    );

    window.scrollTo({ top: destination, behavior: "smooth" });
  };

  return (
    <>
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
        gap={5}
        bg="#F4EDFF"
        border="1px solid"
        borderColor="#E9DDF8"
        borderRadius="2xl"
        p={{ base: 4, md: 8 }}
      >
        <VStack align="flex-start" gap={2}>
          <Heading size={{ base: "lg", md: "xl" }}>
            Have something to share?
          </Heading>
          <Text color="gray.600">
            Every question, suggestion, and piece of feedback helps make Gallery
            better.
          </Text>
        </VStack>
        <Button
          // asChild
          as={'a'}
          href="#contact-form"
          onClick={scrollToContactForm}
          bg={CONTACT_ACCENT}
          color="white"
          borderRadius="lg"
          size="lg"
          flexShrink={0}
          transition="all 0.2s"
          _hover={{ bg: "#7040BA", transform: "translateY(-1px)" }}
          
        >
          <HStack>
            Fill the Form <FiArrowRight />
          </HStack>
        </Button>
      </Flex>

      <VStack gap={1} pt={1}>
        <Text color="gray.700" fontWeight="semibold">
          Gallery by Kanishk Heera
        </Text>
        <Text color="gray.500" fontSize="sm">
          Explore • Organize • Discover
        </Text>
      </VStack>
    </>
  );
}
