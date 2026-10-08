import { Box, Button, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { ABOUT_ACCENT } from "./aboutData";

export default function AboutHero({ photos }) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, lg: 14 }} alignItems="center">
      <VStack align="flex-start" gap={5}>
        <Text color={ABOUT_ACCENT} fontWeight="bold" letterSpacing="0.14em" fontSize="xs">
          ABOUT GALLERY
        </Text>
        <Heading size={{ base: "3xl", md: "5xl" }} lineHeight="1.08" letterSpacing="-0.035em">
          Explore photography, your way.
        </Heading>
        <Text color="gray.600" fontSize={{ base: "md", md: "lg" }} lineHeight="1.8" maxW="620px">
          Gallery is a modern photo browsing and management application designed to make
          discovering, exploring, and organizing beautiful photography simple and enjoyable.
        </Text>
        <Button
          asChild
          bg={ABOUT_ACCENT}
          color="white"
          borderRadius="lg"
          size="lg"
          px={6}
          _hover={{ bg: "#7040BA", transform: "translateY(-2px)" }}
          transition="all 0.2s"
        >
          <RouterLink to="/">
            Explore Photos <FiArrowRight />
          </RouterLink>
        </Button>
      </VStack>

      {/* <Box
        minH={{ base: "250px", sm: "320px", lg: "390px" }}
        borderRadius="3xl"
        overflow="hidden"
        // bg="#6f30d4"
        p={{ base: 3, md: 4 }}
      > */}
        <SimpleGrid columns={2} gap={{ base: 3, md: 4 }} h="100%">
          {[0, 1, 2, 3].map((index) => {
            const photo = photos[index];
            return (
              <Box
                key={photo?.id || index}
                minH={{ base: "112px", sm: "144px", lg: "176px" }}
                borderRadius="2xl"
                overflow="hidden"
                bg={index % 2 === 0 ? "#E8D9FF" : "#DCC8FA"}
                transform={index % 2 === 1 ? "translateY(12px)" : undefined}
              >
                {photo?.urls?.small && (
                  <Box
                    as="img"
                    src={photo.urls.small}
                    alt={photo.alt_description || photo.description || "Photography from Unsplash"}
                    w="100%"
                    h="100%"
                    minH={{ base: "112px", sm: "144px", lg: "176px" }}
                    objectFit="cover"
                    loading="lazy"
                    display="block"
                  />
                )}
              </Box>
            );
          })}
        </SimpleGrid>
      {/* </Box> */}
    </SimpleGrid>
  );
}
