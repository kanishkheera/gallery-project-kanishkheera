import {
  Box,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function PhotoViewer({
  photos,
  selectedIndex,
  setSelectedIndex,
}) {
  const photo = photos[selectedIndex];

  const previous = () => {
    if (selectedIndex > 0) {
      setSelectedIndex((prev) => prev - 1);
    }
  };

  const next = () => {
    if (selectedIndex < photos.length - 1) {
      setSelectedIndex((prev) => prev + 1);
    }
  };

  const close = () => {
    setSelectedIndex(null);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") close();

      if (e.key === "ArrowLeft") previous();

      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  if (!photo) return null;

  return (
    <Box
      position="fixed"
      inset="0"
      bg="blackAlpha.900"
      zIndex="9999"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {/* Close Button */}
      <IconButton
        aria-label="Close"
        position="absolute"
        top="20px"
        right="20px"
        onClick={close}
      >
        <IoClose size={24} />
      </IconButton>

      {/* Previous */}
      <IconButton
        aria-label="Previous"
        position="absolute"
        left="20px"
        onClick={previous}
        disabled={selectedIndex === 0}
      >
        <IoChevronBack size={28} />
      </IconButton>

      {/* Next */}
      <IconButton
        aria-label="Next"
        position="absolute"
        right="20px"
        top="50%"
        transform="translateY(-50%)"
        onClick={next}
        disabled={selectedIndex === photos.length - 1}
      >
        <IoChevronForward size={28} />
      </IconButton>

      {/* Image */}
      <VStack gap={4}>
        <Image
          src={photo.urls.regular}
          alt={photo.alt_description || "Photo"}
          maxH="85vh"
          maxW="90vw"
          objectFit="contain"
          borderRadius="md"
        />

        <Text color="white" fontWeight="bold">
          {photo.user.name}
        </Text>
      </VStack>
    </Box>
  );
}