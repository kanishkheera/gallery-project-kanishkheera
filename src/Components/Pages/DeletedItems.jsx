import { useState } from "react";
import {
  Box,
  Center,
  Text,
  IconButton,
  Flex,
  Grid,
  Image,
  Button,
  Dialog,
  Portal,
  useBreakpointValue,
} from "@chakra-ui/react";
import { IoRefreshOutline, IoTrashOutline } from "react-icons/io5";
import { useDeleted } from "../context/DeleteContext";
import { useFilter } from "../context/FilterContext";
import { filterByOrientation } from "../utils/orientation";

export default function DeletedItems() {
  const { deleted, restorePhoto, permanentDelete, permanentDeleteMany } = useDeleted();
  const { selected } = useFilter();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const photos = filterByOrientation(deleted, selected);

  const columns = useBreakpointValue({
    base: 2,
    md: 3,
    xl: 4,
    "2xl": 5,
  });

  const gap = useBreakpointValue({
    base: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
  });

  const confirmDeleteAll = () => {
    permanentDeleteMany(photos.map((p) => p.id));
    setConfirmOpen(false);
  };

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
    <Box>
      <Flex justify="flex-end" mb={4}>
        <Button
          size="sm"
          colorPalette="red"
          variant="outline"
          onClick={() => setConfirmOpen(true)}
        >
          Delete All ({photos.length})
        </Button>
      </Flex>

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

      <Dialog.Root open={confirmOpen} onOpenChange={(e) => setConfirmOpen(e.open)} role="alertdialog">
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Delete {photos.length} photo{photos.length > 1 ? "s" : ""}?</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text color="gray.600">
                  This action can't be undone. These photos will be permanently removed.
                </Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
                  Cancel
                </Button>
                <Button colorPalette="red" onClick={confirmDeleteAll}>
                  Delete
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger />
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}