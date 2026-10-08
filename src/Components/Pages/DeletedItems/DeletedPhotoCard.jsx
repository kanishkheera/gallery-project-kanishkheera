import { Box, Flex, IconButton, Image } from "@chakra-ui/react";
import { memo, useCallback } from "react";
import { IoRefreshOutline } from "react-icons/io5";

function DeletedPhotoCard({ photo, onRestore }) {
  const handleRestore = useCallback(() => onRestore(photo.id), [onRestore, photo.id]);

  return (
    <Box borderRadius="lg" overflow="hidden" boxShadow="sm" position="relative">
      <Image
        src={photo.urls.small}
        w="100%"
        h="auto"
        aspectRatio={photo.width && photo.height ? `${photo.width} / ${photo.height}` : undefined}
        objectFit="contain"
        opacity={0.6}
      />
      <Flex position="absolute" top={2} right={2}>
        <IconButton
          aria-label="Restore"
          size="sm"
          borderRadius="full"
          bg="whiteAlpha.900"
          color="green.600"
          onClick={handleRestore}
        >
          <IoRefreshOutline size={16} />
        </IconButton>
      </Flex>
    </Box>
  );
}

export default memo(DeletedPhotoCard);
