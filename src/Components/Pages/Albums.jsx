import { Box, Grid, Text, Image, useBreakpointValue } from "@chakra-ui/react";

const albums = [
  { id: 1, name: "Nature", count: 128, image: "https://picsum.photos/400?1" },
  { id: 2, name: "Travel", count: 42, image: "https://picsum.photos/400?2" },
  { id: 3, name: "Cars", count: 86, image: "https://picsum.photos/400?3" },
  { id: 4, name: "Animals", count: 54, image: "https://picsum.photos/400?4" },
  { id: 5, name: "Food", count: 31, image: "https://picsum.photos/400?5" },
  { id: 6, name: "Cities", count: 98, image: "https://picsum.photos/400?6" },
];

export default function Albums() {
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

  return (
    <Grid
      templateColumns={`repeat(${columns}, 1fr)`}
      gap={gap}
      w="100%"
    >
      {albums.map((album) => (
        <Box
          key={album.id}
          borderRadius="xl"
          overflow="hidden"
          bg="white"
          boxShadow="sm"
          cursor="pointer"
          transition="0.2s"
          _hover={{
            transform: "translateY(-4px)",
            boxShadow: "lg",
          }}
        >
          <Image
            src={album.image}
            h="180px"
            w="100%"
            objectFit="cover"
          />

          <Box p={3}>
            <Text fontWeight="bold">{album.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {album.count} Photos
            </Text>
          </Box>
        </Box>
      ))}
    </Grid>
  );
}