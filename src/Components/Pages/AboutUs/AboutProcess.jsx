import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import { processSteps } from "./aboutData";
import { ABOUT_ACCENT } from "./aboutData";

export default function AboutProcess() {
  return (
    <VStack align="stretch" gap={7}>
      <VStack align="flex-start" gap={2}>
        <Heading size={{ base: "xl", md: "2xl" }}>From discovery to organization</Heading>
        <Text color="gray.600" fontSize={{ base: "md", md: "lg" }}>
          Gallery keeps the experience simple from the moment you find a photograph.
        </Text>
      </VStack>
      <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 3, lg: 2 }} align="stretch">
        {processSteps.map((step, index) => (
          <Flex key={step.number} flex="1" align="center" direction={{ base: "column", lg: "row" }} gap={2}>
            <VStack align={{ base: "center", lg: "flex-start" }} textAlign={{ base: "center", lg: "left" }} gap={2} flex="1" py={2}>
              <Flex
                align="center"
                justify="center"
                w="42px"
                h="42px"
                flexShrink={0}
                borderRadius="full"
                bg="#F4EDFF"
                color={ABOUT_ACCENT}
                fontWeight="bold"
                fontSize="sm"
              >
                {step.number}
              </Flex>
              <Heading size="sm">{step.title}</Heading>
              <Text color="gray.600" fontSize="sm" lineHeight="1.6" maxW="170px">
                {step.description}
              </Text>
            </VStack>
            {index < processSteps.length - 1 && (
              <>
                <Box display={{ base: "none", lg: "block" }} color="#B998E8" px={1}>
                  <FiArrowRight />
                </Box>
                <Box display={{ base: "block", lg: "none" }} color="#B998E8" py={1}>
                  <FiArrowDown />
                </Box>
              </>
            )}
          </Flex>
        ))}
      </Flex>
    </VStack>
  );
}
