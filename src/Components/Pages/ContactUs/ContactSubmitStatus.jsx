import { Box, Button, Text } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { CONTACT_ACCENT } from "./contactData";

export default function ContactSubmitStatus({ submissionStatus, isSending }) {
  return (
    <>
      <Text color="gray.500" fontSize="xs" lineHeight="1.5">
        Your message will be sent through Web3Forms.
      </Text>

      {submissionStatus && (
        <Box
          role={submissionStatus === "error" ? "alert" : "status"}
          bg={submissionStatus === "error" ? "red.50" : "green.50"}
          color={submissionStatus === "error" ? "red.800" : "green.800"}
          borderRadius="lg"
          px={4}
          py={3}
        >
          <Text fontSize="sm" fontWeight="medium">
            {submissionStatus === "sending" && "Sending your message…"}
            {submissionStatus === "success" && "Thanks for reaching out. Your message was sent successfully."}
            {submissionStatus === "error" && "We couldn't send your message. Please try again in a moment."}
          </Text>
        </Box>
      )}

      <Button
        type="submit"
        bg={CONTACT_ACCENT}
        color="white"
        borderRadius="lg"
        size="lg"
        alignSelf="flex-start"
        px={6}
        disabled={isSending}
        transition="all 0.2s"
        _hover={{ bg: "#7040BA", transform: "translateY(-1px)" }}
      >
        {isSending ? "Sending…" : <>Send Message <FiArrowRight /></>}
      </Button>
    </>
  );
}
