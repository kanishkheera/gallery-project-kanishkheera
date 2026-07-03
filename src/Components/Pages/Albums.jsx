import { Box, Grid, Text, Image, useBreakpointValue } from "@chakra-ui/react";

const albums = [
  {
    id: 1,
    name: "Nature",
    image:
      "https://img.magnific.com/free-photo/waterfall-chae-son-national-park-lampang-thailand_554837-639.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 2,
    name: "Travel",
    image:
      "https://thumbs.dreamstime.com/b/happy-travel-woman-vacation-concept-funny-traveler-enjoy-her-trip-ready-to-adventure-happy-travel-woman-vacation-concept-118679424.jpg",
  },
  {
    id: 3,
    name: "Cars",
    image:
      "https://i.pinimg.com/736x/f6/4e/fc/f64efc75d8f13ca738a59ffd500e04b0.jpg",
  },
  {
    id: 4,
    name: "Animals",
    image:
      "https://www.shutterstock.com/image-photo/ing-lion-cub-wildlife-animals-600nw-2597617703.jpg",
  },
  {
    id: 5,
    name: "Food",
    image:
      "https://www.cookwithmanali.com/wp-content/uploads/2020/05/Masala-Dosa-500x500.jpg",
  },
  {
    id: 6,
    name: "Cities",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/330px-London_Skyline_%28125508655%29.jpeg",
  },
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
    <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={gap} w="100%">
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
          <Image src={album.image} h="180px" w="100%" objectFit="cover" />

          <Box p={3}>
            <Text fontWeight="bold">{album.name}</Text>
          </Box>
        </Box>
      ))}
    </Grid>
  );
}
