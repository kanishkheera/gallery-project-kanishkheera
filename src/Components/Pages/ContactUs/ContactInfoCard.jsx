import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { FiMail } from "react-icons/fi";
import { CONTACT_ACCENT, CONTACT_EMAIL, helpTopics } from "./contactData";

export default function ContactInfoCard() {
  return (
    <VStack
      align="stretch"
      gap={6}
      bg="#F6F1FC"
      border="1px solid"
      borderColor="#E9DDF8"
      borderRadius="2xl"
      p={{ base: 3, sm: 5, md: 8 }}
    >
      <VStack align="flex-start" gap={2}>
        <Heading size={{ base: "lg", md: "xl" }}>How can we help?</Heading>
        <Text color="gray.600" lineHeight="1.75">
          Whether you've found a bug, have an idea for a new feature, or simply want to share your feedback, we'd love to hear from you.
        </Text>
      </VStack>

      <VStack align="stretch" gap={5}>
        {helpTopics.map(({ icon: Icon, title, description }) => (
          <HStack key={title} align="flex-start" gap={4}>
            <Flex
              align="center"
              justify="center"
              flexShrink={0}
              w="44px"
              h="44px"
              bg="white"
              color={CONTACT_ACCENT}
              border="1px solid"
              borderColor="#E9DDF8"
              borderRadius="xl"
            >
              <Icon size={20} />
            </Flex>
            <VStack align="flex-start" gap={1} minW={0}>
              <Heading size="sm">{title}</Heading>
              <Text color="gray.600" fontSize="sm" lineHeight="1.65">{description}</Text>
            </VStack>
          </HStack>
        ))}
      </VStack>

      <Box bg="whiteAlpha.800" borderRadius="lg" px={4} py={3}>
        <Text color="#68419D" fontSize="sm" fontWeight="medium">
          Your feedback helps improve the Gallery experience.
        </Text>
      </Box>

      {CONTACT_EMAIL && (
        <HStack color="gray.600" fontSize="sm" gap={2}>
          <FiMail color={CONTACT_ACCENT} />
          <Text>
            Prefer email?{" "}
            <Box as="a" href={`mailto:${CONTACT_EMAIL}`} color={CONTACT_ACCENT} fontWeight="semibold">
              {CONTACT_EMAIL}
            </Box>
          </Text>
        </HStack>
      )}
    </VStack>
  );
}
