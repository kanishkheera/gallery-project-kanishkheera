import { Box, Flex, Image, Skeleton } from "@chakra-ui/react";

export default function PhotoMedia({
  photos,
  emblaRef,
  fullView,
  mediaSize,
  isCurrentReady,
  onImageLoad,
}) {
  return (
    <Box
      position="relative"
      w={mediaSize.w}
      h={mediaSize.h}
      maxW={mediaSize.maxW}
      maxH={mediaSize.maxH}
    >
      {!isCurrentReady && (
        <Skeleton position="absolute" inset={0} w="100%" h="100%" zIndex={2} />
      )}
      <Box
        ref={emblaRef}
        overflow="hidden"
        w="100%"
        h="100%"
        visibility={isCurrentReady ? "visible" : "hidden"}
      >
        <Box display="flex" h="100%">
          {photos.map((photo) => (
            <Flex
              key={photo.id}
              flex="0 0 100%"
              justifyContent="center"
              alignItems="center"
              bg={fullView ? "black" : "gray.50"}
              h="100%"
            >
              <Image
                src={fullView ? photo.urls.full : photo.urls.regular}
                alt={photo.alt_description || ""}
                draggable={false}
                userSelect="none"
                display="block"
                w="100%"
                h="100%"
                objectFit="contain"
                onLoad={() => onImageLoad(photo.id)}
              />
            </Flex>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
