import { useState } from "react";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { frequentlyAskedQuestions } from "./contactData";
import { CONTACT_ACCENT } from "./contactData";

export default function ContactFAQ() {
  const [openQuestion, setOpenQuestion] = useState(0);

  return (
    <VStack align="stretch" gap={5}>
      <Heading size={{ base: "xl", md: "2xl" }}>Frequently asked questions</Heading>
      <VStack align="stretch" gap={3}>
        {frequentlyAskedQuestions.map(({ question, answer }, index) => {
          const isOpen = openQuestion === index;
          const panelId = `contact-faq-answer-${index}`;
          return (
            <Box
              key={question}
              border="1px solid"
              borderColor={isOpen ? "#D9C5F2" : "gray.200"}
              borderRadius="xl"
              overflow="hidden"
              bg="white"
            >
              <HStack
                as="button"
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenQuestion(isOpen ? -1 : index)}
                cursor="pointer"
                w="100%"
                justify="space-between"
                textAlign="left"
                px={{ base: 4, md: 5 }}
                py={4}
                color={isOpen ? CONTACT_ACCENT : "gray.800"}
                transition="background 0.2s"
                _hover={{ bg: "#FAF7FE" }}
                _focusVisible={{ outline: "2px solid #8550D3", outlineOffset: "-2px" }}
              >
                <Text fontWeight="semibold" pr={3}>{question}</Text>
                <Box transform={isOpen ? "rotate(180deg)" : "none"} transition="transform 0.2s" flexShrink={0}>
                  <FiChevronDown />
                </Box>
              </HStack>
              {isOpen && (
                <Box id={panelId} px={{ base: 4, md: 5 }} pb={4} color="gray.600" lineHeight="1.7" fontSize="sm">
                  {answer}
                </Box>
              )}
            </Box>
          );
        })}
      </VStack>
    </VStack>
  );
}
