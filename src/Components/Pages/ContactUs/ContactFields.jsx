import { Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { CONTACT_ACCENT } from "./contactData";

function ContactField({ id, label, error, children }) {
  return (
    <VStack align="stretch" gap={2}>
      <Text as="label" htmlFor={id} fontSize="sm" fontWeight="semibold" color="gray.700">
        {label}
      </Text>
      {children}
      {error && (
        <Text id={`${id}-error`} role="alert" color="red.600" fontSize="sm">
          {error}
        </Text>
      )}
    </VStack>
  );
}

const fieldStyles = {
  borderColor: "gray.200",
  borderRadius: "lg",
  bg: "white",
  _hover: { borderColor: "#C9A9F2" },
  _focus: {
    borderColor: CONTACT_ACCENT,
    boxShadow: "0 0 0 3px rgba(133, 80, 211, 0.16)",
  },
};

export default function ContactFields({ values, errors, onChange }) {
  return (
    <>
      <ContactField id="contact-name" label="Name" error={errors.name}>
        <Input
          {...fieldStyles}
          id="contact-name"
          name="name"
          placeholder="Enter your name"
          value={values.name}
          onChange={onChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          autoComplete="name"
        />
      </ContactField>
      <ContactField id="contact-email" label="Email Address" error={errors.email}>
        <Input
          {...fieldStyles}
          id="contact-email"
          name="email"
          type="email"
          inputMode="email"
          placeholder="Enter your email address"
          value={values.email}
          onChange={onChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          autoComplete="email"
        />
      </ContactField>
      <ContactField id="contact-subject" label="Subject" error={errors.subject}>
        <Input
          {...fieldStyles}
          id="contact-subject"
          name="subject"
          placeholder="What is your message about?"
          value={values.subject}
          onChange={onChange}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
        />
      </ContactField>
      <ContactField id="contact-message" label="Message" error={errors.message}>
        <Textarea
          {...fieldStyles}
          id="contact-message"
          name="message"
          placeholder="Write your message here..."
          value={values.message}
          onChange={onChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          minH="150px"
          resize="vertical"
        />
      </ContactField>
    </>
  );
}
