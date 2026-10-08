import { Box, SkeletonText, Text } from "@chakra-ui/react";

function InfoRow({ label, value }) {
  return (
    <Box mb={4}>
      <Text fontSize="xs" color="gray.500" mb={1}>{label}</Text>
      <Text fontSize="sm" color="gray.800">{value}</Text>
    </Box>
  );
}

export default function PhotoInfoPanel({ photo, isReady }) {
  return (
    <Box
      w={{ base: "100%", md: "280px" }}
      maxH={{ base: "40vh", md: "none" }}
      flexShrink={0}
      borderLeft={{ base: "none", md: "1px solid" }}
      borderTop={{ base: "1px solid", md: "none" }}
      borderColor="gray.200"
      p={5}
      overflowY="auto"
    >
      {isReady ? (
        <>
          <Text fontWeight="700" fontSize="md" mb={4} color="gray.900">Photo Info</Text>
          <InfoRow
            label="Published"
            value={photo.created_at
              ? new Date(photo.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "—"}
          />
          <InfoRow
            label="Dimensions"
            value={photo.width && photo.height ? `${photo.width} × ${photo.height}` : "—"}
          />
        </>
      ) : (
        <>
          <SkeletonText noOfLines={1} skeletonHeight="3" mb={4} />
          <SkeletonText noOfLines={1} skeletonHeight="3" />
        </>
      )}
    </Box>
  );
}
