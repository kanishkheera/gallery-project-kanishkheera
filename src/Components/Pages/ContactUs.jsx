import { SimpleGrid, VStack } from "@chakra-ui/react";
import ContactFAQ from "./ContactUs/ContactFAQ";
import ContactFooter from "./ContactUs/ContactFooter";
import ContactHero from "./ContactUs/ContactHero";
import ContactInfoCard from "./ContactUs/ContactInfoCard";
import ContactMessageForm from "./ContactUs/ContactMessageForm";
import ContactQuickTopics from "./ContactUs/ContactQuickTopics";
import ContactSocials from "./ContactUs/ContactSocials";
import useContactForm from "./ContactUs/useContactForm";

export default function ContactUs() {
  const form = useContactForm();

  return (
    <VStack
      align="stretch"
      gap={{ base: 8, md: 16, xl: 20 }}
      maxW="1180px"
      mx="auto"
      px={{ base: 2, sm: 4, md: 7, xl: 10 }}
      py={{ base: 8, md: 12, xl: 14 }}
    >
      <ContactHero />

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 5, lg: 7 }} alignItems="stretch">
        <ContactInfoCard />
        <ContactMessageForm {...form} onChange={form.handleChange} onSubmit={form.handleSubmit} />
      </SimpleGrid>

      <ContactSocials />
      <ContactQuickTopics />
      <ContactFAQ />
      <ContactFooter />
    </VStack>
  );
}
