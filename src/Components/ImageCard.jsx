import { Card, Image, Skeleton } from "@chakra-ui/react";
import { memo, useCallback, useState } from "react";

const ImageCard = memo(function ImageCard({ photoId, src, onSelect }) {
  const [loaded, setLoaded] = useState(false);
  const handleClick = useCallback(() => onSelect(photoId), [onSelect, photoId]);

  return (
    <Card.Root
      overflow="hidden"
      borderRadius="xl"
      transition="0.3s"
      _hover={{
        transform: "scale(1.02)",
        boxShadow: "xl",
        cursor: "pointer",
      }}
    >
      {/* Skeleton (shows until image loads) */}
      {!loaded && (
        <Skeleton height={{ base: "180px", sm: "210px", md: "250px" }} width="100%" />
      )}

      <Image
        src={src}
        alt="Unsplash Image"
        w="100%"
        display={loaded ? "block" : "none"}
        onLoad={() => setLoaded(true)}
        onClick={handleClick}
      />
    </Card.Root>
  );
});

export default ImageCard;
