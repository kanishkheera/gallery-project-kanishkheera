import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { FiArrowUpRight } from "react-icons/fi";
import { FaGithub, FaGlobe, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { CONTACT_ACCENT } from "./contactData";

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/kanishkheera", icon: FaLinkedinIn, color: "#0A66C2" },
  { name: "GitHub", href: "https://github.com/kanishkheera", icon: FaGithub, color: "#24292F" },
  { name: "Portfolio", href: "https://kanishk-heera.vercel.app/", icon: FaGlobe, color: CONTACT_ACCENT },
  { name: "X", href: "https://x.com/kanishkheera", icon: FaXTwitter, color: "#111111" },
];

export default function ContactSocials() {
  return (
    <Box
      bg="#FBF9FE"
      border="1px solid"
      borderColor="#E9DDF8"
      borderRadius="2xl"
      p={{ base: 4, sm: 6, md: 8 }}
    >
      <Heading
        size={{ base: "md", md: "lg" }}
        color={CONTACT_ACCENT}
        letterSpacing="0.1em"
        mb={{ base: 4, md: 5 }}
      >
        CONNECT WITH ME
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2 }} gap={{ base: 3, md: 4 }}>
        {socialLinks.map(({ name, href, icon: Icon, color }) => (
          <Box
            as="a"
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit Kanishk on ${name} (opens in a new tab)`}
            display="block"
            bg="white"
            border="1px solid"
            borderColor="#E9DDF8"
            borderRadius="xl"
            p={{ base: 4, md: 5 }}
            transition="all 0.2s ease"
            cursor="pointer"
            _hover={{ borderColor: CONTACT_ACCENT, transform: "translateY(-2px)", boxShadow: "md" }}
            _focusVisible={{ outline: `2px solid ${CONTACT_ACCENT}`, outlineOffset: "2px" }}
          >
            <Flex align="center" justify="space-between" gap={3}>
              <Flex align="center" gap={3} minW={0}>
                <Flex
                  align="center"
                  justify="center"
                  flexShrink={0}
                  w="42px"
                  h="42px"
                  borderRadius="lg"
                  bg="#F4EDFF"
                  color={color}
                >
                  <Icon size={20} />
                </Flex>
                <Text fontWeight="semibold" color="gray.800">{name}</Text>
              </Flex>
              <FiArrowUpRight color="#8550D3" />
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
