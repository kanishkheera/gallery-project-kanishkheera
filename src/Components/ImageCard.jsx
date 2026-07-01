import { Card, Image, Skeleton } from "@chakra-ui/react";
import { useState } from "react";

const ImageCard = ({ src }) => {
  const [loaded, setLoaded] = useState(false);

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
      {!loaded && <Skeleton height="250px" width="100%" />}

      <Image
        src={src}
        alt="Unsplash Image"
        w="100%"
        display={loaded ? "block" : "none"}
        onLoad={() => setLoaded(true)}
      />
    </Card.Root>
  );
};

export default ImageCard;