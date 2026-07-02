import { Box, IconButton, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";

export default function PhotoViewer({
  photos,
  selectedIndex,
  setSelectedIndex,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    duration: 25,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const close = () => {
    setSelectedIndex(null);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

useEffect(() => {
  if (!emblaApi) return;

  emblaApi.scrollTo(selectedIndex, true);

  const onSelect = () => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  };

  onSelect();

  emblaApi.on("select", onSelect);
  emblaApi.on("reInit", onSelect);

  return () => {
    emblaApi.off("select", onSelect);
    emblaApi.off("reInit", onSelect);
  };
}, [emblaApi]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") close();

      if (e.key === "ArrowLeft") emblaApi?.scrollPrev();

      if (e.key === "ArrowRight") emblaApi?.scrollNext();
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [emblaApi]);

  return (
    <Box
      position="fixed"
      inset={0}
      bg="rgba(0,0,0,.92)"
      zIndex={9999}
      display="flex"
      justifyContent="center"
      alignItems="center"
      onClick={close}
    >
      {/* Close */}
      <IconButton
        aria-label="Close"
        position="fixed"
        top="20px"
        right="20px"
        zIndex={100}
        borderRadius="full"
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
      >
        <IoClose size={26} />
      </IconButton>

      {/* Previous */}
      <IconButton
        aria-label="Previous"
        position="fixed"
        left="30px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={100}
        borderRadius="full"
        onClick={(e) => {
          e.stopPropagation();
          emblaApi?.scrollPrev();
        }}
        disabled={!canScrollPrev}
      >
        <IoChevronBack size={28} />
      </IconButton>

      {/* Next */}
      <IconButton
        aria-label="Next"
        position="fixed"
        right="30px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={100}
        borderRadius="full"
        onClick={(e) => {
          e.stopPropagation();
          emblaApi?.scrollNext();
        }}
      >
        <IoChevronForward size={28} />
      </IconButton>

      {/* Slider */}
      <Box ref={emblaRef} overflow="hidden" width="100%">
        <Box display="flex">
          {photos.map((photo) => (
            <Box
              key={photo.id}
              flex="0 0 100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {/* Clicking the image closes the viewer */}
              <Box textAlign="center">
                <Image
                  src={photo.urls.regular}
                  maxH="82vh"
                  maxW="90vw"
                  objectFit="contain"
                  borderRadius="lg"
                  draggable={false}
                  userSelect="none"
                />

                <Text color="white" mt={4} fontWeight="600">
                  {photo.user.name}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
