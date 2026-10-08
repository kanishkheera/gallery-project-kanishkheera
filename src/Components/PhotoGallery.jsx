import { Box, Center, Spinner, Text, useBreakpointValue } from "@chakra-ui/react";
import { memo, useCallback } from "react";
import Masonry from "react-masonry-css";
import ImageCard from "./ImageCard";
import PhotoViewer from "./PhotoViewer";
import "./Styles/masonry.css";

const breakpointColumnsObj = {
  default: 5,
  1400: 4,
  768: 3,
  500: 2,
  360: 2,
};

function PhotoGalleryComponent({
  photos,
  loading,
  showLoading = loading,
  waitingForFilteredResults = false,
  hasMore,
  selectedIndex,
  selectedPhotoId,
  setSelectedPhotoId,
  closeViewer,
  onLoadMore,
  emptyMessage = "No photos match this filter.",
}) {
  const gap = useBreakpointValue({
    base: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
  });
  const handlePhotoSelect = useCallback(
    (photoId) => setSelectedPhotoId(photoId),
    [setSelectedPhotoId],
  );

  const showEmptyMessage = photos.length === 0 && !loading && !waitingForFilteredResults;

  return (
    <Box
      style={{
        "--gallery-gap": gap,
      }}
    >
      {showEmptyMessage ? (
        <Center py={16}>
          <Text color="gray.500">{emptyMessage}</Text>
        </Center>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {photos.map((photo) => (
            <ImageCard
              key={photo.id}
              photoId={photo.id}
              src={photo.urls.regular}
              onSelect={handlePhotoSelect}
            />
          ))}
        </Masonry>
      )}

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

      {(showLoading || waitingForFilteredResults) && (
        <Center py={8}>
          <Spinner size="lg" />
        </Center>
      )}

    </Box>
  );
}

export const PhotoGallery = memo(PhotoGalleryComponent);
