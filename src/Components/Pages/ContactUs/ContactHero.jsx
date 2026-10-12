import { Heading, Text, VStack } from "@chakra-ui/react";
import { CONTACT_ACCENT } from "./contactData";

export default function ContactHero() {
  return (
    <VStack align="flex-start" textAlign="left" gap={5}>
      <Text color={CONTACT_ACCENT} fontWeight="bold" letterSpacing="0.14em" fontSize="xs">
        CONTACT US
      </Text>
      <Heading size={{ base: "3xl", md: "5xl" }} lineHeight="1.08" letterSpacing="-0.035em">
        Let's start a conversation.
      </Heading>
      <Text color="gray.600" fontSize={{ base: "md", md: "lg" }} lineHeight="1.8" maxW="620px">
        Have a question, suggestion, or found something that isn't working as expected? We'd love to hear from you.
      </Text>
    </VStack>
  );
}
