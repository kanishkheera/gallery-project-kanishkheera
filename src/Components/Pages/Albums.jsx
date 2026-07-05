import { Box, Grid, Text, Image, useBreakpointValue } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { albums } from "../data/albums";

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
        <NavLink
          to={`/albums/${album.path}`}
          key={album.id}
          onClick={() => window.scrollTo(0, 0)}
        >
          <Box
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
        </NavLink>
      ))}
    </Grid>
  );
}
