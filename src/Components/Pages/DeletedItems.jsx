import { Box, Button, Center, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import Masonry from "react-masonry-css";
import DeletedPhotoCard from "./DeletedItems/DeletedPhotoCard";
import useDeletedItems from "./DeletedItems/useDeletedItems";
import "../Styles/masonry.css";

export default function DeletedItems() {
  const { deleted, photos, handleRestore, restoreAll } = useDeletedItems();
  const gap = useBreakpointValue({ base: "8px", md: "12px", lg: "16px", xl: "20px" });
  const breakpointColumns = { default: 5, 1400: 4, 768: 3, 500: 2, 360: 2 };

  if (deleted.length === 0) {
    return (
      <Center h="60vh">
        <Text color="gray.500">Trash is empty.</Text>
      </Center>
    );
  }

  return (
    <Box>
      <Flex justify="flex-end" mb={4}>
        <Button size="sm" colorPalette="green" variant="outline" onClick={restoreAll}>
          Restore All ({deleted.length})
        </Button>
      </Flex>
      {photos.length === 0 ? (
        <Center h="40vh">
          <Text color="gray.500">No items match this filter.</Text>
        </Center>
      ) : (
        <Box style={{ "--gallery-gap": gap }}>
          <Masonry
            breakpointCols={breakpointColumns}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {photos.map((photo) => (
              <DeletedPhotoCard key={photo.id} photo={photo} onRestore={handleRestore} />
            ))}
          </Masonry>
        </Box>
      )}
    </Box>
  );
}
