import { Box, Center, Text, IconButton, Flex, Grid, Image, useBreakpointValue } from "@chakra-ui/react";
import { IoRefreshOutline, IoTrashOutline } from "react-icons/io5";
import { useDeleted } from "../context/DeleteContext";
import { useFilter } from "../context/FilterContext";
import { filterByOrientation } from "../utils/orientation";

export default function DeletedItems() {
  const { deleted, restorePhoto, permanentDelete } = useDeleted();
  const { selected } = useFilter();

  const photos = filterByOrientation(deleted, selected);

  const columns = useBreakpointValue({
    base: 2,
    sm: 3,
    md: 4,
    xl: 5,
    "2xl": 6,
  });

  const gap = useBreakpointValue({
    base: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
  });

  if (photos.length === 0) {
    return (
      <Center h="60vh">
        <Text color="gray.500">
          {deleted.length === 0 ? "Trash is empty." : "No items match this filter."}
        </Text>
      </Center>
    );
  }

  return (
    <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={gap} w="100%">
      {photos.map((photo) => (
        <Box key={photo.id} borderRadius="lg" overflow="hidden" boxShadow="sm" position="relative">
          <Image src={photo.urls.small} w="100%" h="220px" objectFit="cover" opacity={0.6} />

          <Flex position="absolute" top={2} right={2} gap={2}>
            <IconButton
              aria-label="Restore"
              size="sm"
              borderRadius="full"
              bg="whiteAlpha.900"
              color="green.600"
              onClick={() => restorePhoto(photo.id)}
            >
              <IoRefreshOutline size={16} />
            </IconButton>

            <IconButton
              aria-label="Delete permanently"
              size="sm"
              borderRadius="full"
              bg="whiteAlpha.900"
              color="red.600"
              onClick={() => permanentDelete(photo.id)}
            >
              <IoTrashOutline size={16} />
            </IconButton>
          </Flex>
        </Box>
      ))}
    </Grid>
  );
}