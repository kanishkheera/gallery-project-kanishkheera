import { Heading, Text, VStack } from "@chakra-ui/react";
import ContactFields from "./ContactFields";
import ContactSubmitStatus from "./ContactSubmitStatus";

export default function ContactMessageForm({
  values,
  errors,
  submissionStatus,
  isSending,
  onChange,
  onSubmit,
}) {
  return (
    <VStack
      as="form"
      onSubmit={onSubmit}
      noValidate
      align="stretch"
      gap={5}
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="2xl"
      p={{ base: 3, sm: 5, md: 8 }}
      boxShadow="sm"
    >
      <VStack align="flex-start" gap={2} mb={1}>
        <Heading size={{ base: "lg", md: "xl" }}>Send us a message</Heading>
        <Text color="gray.600" lineHeight="1.6">
          Fill out the form below and let us know how we can help.
        </Text>
      </VStack>
      <ContactFields values={values} errors={errors} onChange={onChange} />
      <ContactSubmitStatus submissionStatus={submissionStatus} isSending={isSending} />
    </VStack>
  );
}
