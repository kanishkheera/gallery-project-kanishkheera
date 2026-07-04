import { Box, Center, Spinner, useBreakpointValue } from "@chakra-ui/react";
import Masonry from "react-masonry-css";
import ImageCard from "./ImageCard";
import PhotoViewer from "./PhotoViewer";
import "./Styles/masonry.css";

export function PhotoGallery({
  photos,
  loading,
  hasMore,
  selectedIndex,
  selectedPhotoId,
  setSelectedPhotoId,
  closeViewer,
  onLoadMore,
}) {
  const breakpointColumnsObj = {
    default: 5,
    1400: 4,
    768: 3,
    500: 2,
  };

  const gap = useBreakpointValue({
    base: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
  });

  return (
    <Box
      style={{
        "--gallery-gap": gap,
      }}
    >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {photos.map((photo) => (
          <ImageCard
            key={photo.id}
            src={photo.urls.regular}
            onClick={() => setSelectedPhotoId(photo.id)}
          />
        ))}
      </Masonry>

      {selectedIndex !== null && selectedIndex !== -1 && (
        <PhotoViewer
          photos={photos}
          selectedIndex={selectedIndex}
          selectedPhotoId={selectedPhotoId}
          setSelectedPhotoId={setSelectedPhotoId}
          onClose={closeViewer}
          hasMore={hasMore}
          loadingMore={loading}
          onLoadMore={onLoadMore}
        />
      )}

      {loading && (
        <Center py={8}>
          <Spinner size="lg" />
        </Center>
      )}
    </Box>
  );
}