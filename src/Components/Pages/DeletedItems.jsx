import { Grid, Box, Image, Text, Center, IconButton, Flex } from "@chakra-ui/react";
import { IoRefreshOutline, IoTrashOutline } from "react-icons/io5";
import { useDeleted } from "../context/DeleteContext";

export default function DeletedItems() {
  const { deleted, restorePhoto, permanentDelete } = useDeleted();

  if (deleted.length === 0) {
    return (
      <Center h="60vh">
        <Text color="gray.500">Trash is empty.</Text>
      </Center>
    );
  }

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(220px, 1fr))" gap={4}>
      {deleted.map((photo) => (
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