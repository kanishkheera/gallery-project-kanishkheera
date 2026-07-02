import { Box, IconButton, Image, Text, Flex, Avatar } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  IoChevronBack,
  IoChevronForward,
  IoClose,
  IoHeart,
  IoHeartOutline,
  IoDownloadOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";

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
  const [favorites, setFavorites] = useState(new Set());
  const [showInfo, setShowInfo] = useState(false);

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
      setShowInfo(false);
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

  const currentPhoto = photos[selectedIndex];

  const toggleFavorite = (photoId) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(photoId)) {
        next.delete(photoId);
      } else {
        next.add(photoId);
      }
      return next;
    });
  };

  const handleDownload = (photo) => {
    const link = document.createElement("a");
    link.href = photo.links?.download || photo.urls.full;
    link.download = `${photo.id}.jpg`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isFavorited = currentPhoto && favorites.has(currentPhoto.id);

  // Responsive chrome sizes
  const HEADER_H = { base: "44px", md: "52px" };
  const HEADER_H_CSS = { base: "44px", md: "52px" }; // used inside calc()
  const INFO_W = 280;
  const OUTER_PX = { base: "10px", md: "90px" };
  const OUTER_PY = { base: "10px", md: "40px" };
  const PANEL_MAX_W = { base: "100vw", md: "94vw" };
  const PANEL_MAX_H = { base: "100dvh", md: "90vh" };

  return (
    <Box
      position="fixed"
      inset={0}
      bg="rgba(0,0,0,.85)"
      zIndex={9999}
      onClick={close}
    >
      {/* Close — top right, pinned to viewport */}
      <IconButton
        aria-label="Close"
        position="fixed"
        top={{ base: "12px", md: "20px" }}
        right={{ base: "12px", md: "20px" }}
        zIndex={100}
        size={{ base: "sm", md: "md" }}
        borderRadius="full"
        bg="whiteAlpha.900"
        color="black"
        _hover={{ bg: "white" }}
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
      >
        <IoClose size={20} />
      </IconButton>

      {/* Prev — hidden on mobile */}
      <IconButton
        aria-label="Previous"
        display={{ base: "none", md: "inline-flex" }}
        position="fixed"
        left="24px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={100}
        borderRadius="full"
        variant="ghost"
        color="whiteAlpha.800"
        _hover={{ bg: "whiteAlpha.200", color: "white" }}
        onClick={(e) => {
          e.stopPropagation();
          emblaApi?.scrollPrev();
        }}
        disabled={!canScrollPrev}
      >
        <IoChevronBack size={30} />
      </IconButton>

      {/* Next — hidden on mobile */}
      <IconButton
        aria-label="Next"
        display={{ base: "none", md: "inline-flex" }}
        position="fixed"
        right="24px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={100}
        borderRadius="full"
        variant="ghost"
        color="whiteAlpha.800"
        _hover={{ bg: "whiteAlpha.200", color: "white" }}
        onClick={(e) => {
          e.stopPropagation();
          emblaApi?.scrollNext();
        }}
        disabled={!canScrollNext}
      >
        <IoChevronForward size={30} />
      </IconButton>

      {/* Center wrapper */}
      <Flex
        position="fixed"
        inset={0}
        justifyContent="center"
        alignItems="center"
        px={OUTER_PX}
        py={OUTER_PY}
      >
        {/* White panel — sizes itself to content, capped by viewport */}
        <Flex
          bg="white"
          maxW={PANEL_MAX_W}
          maxH={PANEL_MAX_H}
          w="fit-content"
          h="fit-content"
          direction={{ base: "column", md: "row" }}
          overflow="hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main column: header + image */}
          <Flex direction="column" minW={0} minH={0}>
            {/* Header bar */}
            <Flex
              align="center"
              justify="space-between"
              px={{ base: 3, md: 5 }}
              py={{ base: 2, md: 3 }}
              h={HEADER_H}
              borderBottom="1px solid"
              borderColor="gray.200"
              flexShrink={0}
            >
              <Flex align="center" gap={{ base: 2, md: 3 }} minW={0}>
                <Avatar.Root size="sm">
                  <Avatar.Image
                    src={currentPhoto?.user?.profile_image?.medium}
                  />
                  <Avatar.Fallback name={currentPhoto?.user?.name} />
                </Avatar.Root>
                <Text
                  fontWeight="600"
                  fontSize="sm"
                  color="gray.800"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {currentPhoto?.user?.name}
                </Text>
              </Flex>

              <Flex align="center" gap={{ base: 1, md: 2 }} flexShrink={0}>
                <IconButton
                  aria-label="Favorite"
                  variant="ghost"
                  size="sm"
                  borderRadius="full"
                  color={isFavorited ? "red.500" : "gray.600"}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(currentPhoto.id);
                  }}
                >
                  {isFavorited ? (
                    <IoHeart size={18} />
                  ) : (
                    <IoHeartOutline size={18} />
                  )}
                </IconButton>

                <IconButton
                  aria-label="Info"
                  variant="ghost"
                  size="sm"
                  borderRadius="full"
                  color={showInfo ? "blue.500" : "gray.600"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowInfo((s) => !s);
                  }}
                >
                  <IoInformationCircleOutline size={18} />
                </IconButton>

                <IconButton
                  aria-label="Download"
                  variant="ghost"
                  size="sm"
                  borderRadius="full"
                  color="gray.600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(currentPhoto);
                  }}
                >
                  <IoDownloadOutline size={18} />
                </IconButton>
              </Flex>
            </Flex>

            {/* Slider — sized from the current photo's own aspect ratio */}
            <Box
              ref={emblaRef}
              overflow="hidden"
              w="fit-content"
              maxW={{
                base: `calc(${PANEL_MAX_W.base} - ${
                  parseInt(OUTER_PX.base) * 2
                }px)`,
                md: `calc(${PANEL_MAX_W.md} - ${
                  showInfo ? `${INFO_W}px` : "0px"
                })`,
              }}
              maxH={{
                base: `calc(${PANEL_MAX_H.base} - ${HEADER_H_CSS.base} - ${
                  parseInt(OUTER_PX.base) * 2
                }px)`,
                md: `calc(${PANEL_MAX_H.md} - ${HEADER_H_CSS.md})`,
              }}
            >
              <Box display="flex" h="100%">
                {photos.map((photo) => {
                  const ratio =
                    photo.width && photo.height
                      ? photo.width / photo.height
                      : 4 / 3;
                  return (
                    <Flex
                      key={photo.id}
                      flex="0 0 100%"
                      justifyContent="center"
                      alignItems="center"
                      bg="gray.50"
                    >
                      <Image
                        src={photo.urls.regular}
                        alt={photo.alt_description || ""}
                        draggable={false}
                        userSelect="none"
                        display="block"
                        maxW="100%"
                        maxH="100%"
                        w="auto"
                        h="auto"
                        style={{ aspectRatio: ratio }}
                        objectFit="contain"
                      />
                    </Flex>
                  );
                })}
              </Box>
            </Box>
          </Flex>

          {/* Info side panel — full width sheet on mobile, side panel on desktop */}
          {showInfo && currentPhoto && (
            <Box
              w={{ base: "100%", md: `${INFO_W}px` }}
              maxH={{ base: "40vh", md: "none" }}
              flexShrink={0}
              borderLeft={{ base: "none", md: "1px solid" }}
              borderTop={{ base: "1px solid", md: "none" }}
              borderColor="gray.200"
              p={5}
              overflowY="auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Text fontWeight="700" fontSize="md" mb={4} color="gray.900">
                Photo Info
              </Text>

              {currentPhoto.description && (
                <InfoRow label="Description" value={currentPhoto.description} />
              )}

              {currentPhoto.alt_description && (
                <InfoRow
                  label="Alt description"
                  value={currentPhoto.alt_description}
                />
              )}

              <InfoRow
                label="Published"
                value={
                  currentPhoto.created_at
                    ? new Date(currentPhoto.created_at).toLocaleDateString(
                        undefined,
                        { year: "numeric", month: "long", day: "numeric" }
                      )
                    : "—"
                }
              />

              <InfoRow
                label="Dimensions"
                value={
                  currentPhoto.width && currentPhoto.height
                    ? `${currentPhoto.width} × ${currentPhoto.height}`
                    : "—"
                }
              />

              {currentPhoto.location?.name && (
                <InfoRow label="Location" value={currentPhoto.location.name} />
              )}

              {currentPhoto.exif?.make && (
                <InfoRow
                  label="Camera"
                  value={`${currentPhoto.exif.make} ${
                    currentPhoto.exif.model || ""
                  }`}
                />
              )}

              <Flex gap={5} mt={4}>
                <Box>
                  <Text fontSize="xs" color="gray.500">
                    Likes
                  </Text>
                  <Text fontWeight="600" color="gray.800">
                    {currentPhoto.likes ?? "—"}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.500">
                    Downloads
                  </Text>
                  <Text fontWeight="600" color="gray.800">
                    {currentPhoto.downloads ?? "—"}
                  </Text>
                </Box>
              </Flex>
            </Box>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

function InfoRow({ label, value }) {
  return (
    <Box mb={4}>
      <Text fontSize="xs" color="gray.500" mb={1}>
        {label}
      </Text>
      <Text fontSize="sm" color="gray.800">
        {value}
      </Text>
    </Box>
  );
}