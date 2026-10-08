import { Box } from "@chakra-ui/react";
import { memo } from "react";
import usePhotoViewer from "./PhotoViewer/usePhotoViewer";
import PhotoViewerSlide from "./PhotoViewer/components/PhotoViewerSlide";
import ViewerControls from "./PhotoViewer/components/ViewerControls";

function PhotoViewer({
  photos,
  selectedIndex,
  setSelectedPhotoId,
  onLoadMore,
  onClose,
  hasMore = false,
  loadingMore = false,
}) {
  const viewer = usePhotoViewer({
    photos,
    selectedIndex,
    setSelectedPhotoId,
    onLoadMore,
    onClose,
    hasMore,
    loadingMore,
  });
  const mediaSize = getMediaSize(viewer.fullView, viewer.showInfo);

  return (
    <Box position="fixed" inset={0} bg="rgba(0,0,0,.85)" zIndex={9999} onClick={onClose}>
      <ViewerControls
        fullView={viewer.fullView}
        setFullView={viewer.setFullView}
        setShowInfo={viewer.setShowInfo}
        onClose={onClose}
        goPrev={viewer.goPrev}
        goNext={viewer.goNext}
        canScrollPrev={viewer.canScrollPrev}
        nextDisabled={viewer.nextDisabled}
        isLastSlide={viewer.isLastSlide}
        loadingMore={loadingMore}
      />
      <PhotoViewerSlide photos={photos} viewer={viewer} mediaSize={mediaSize} />
    </Box>
  );
}

function getMediaSize(fullView, showInfo) {
  if (fullView) {
    return { w: "100vw", h: "100dvh", maxW: "100vw", maxH: "100dvh" };
  }

  return {
    w: {
      base: "90vw",
      sm: "85vw",
      md: showInfo ? "calc(75vw - 280px)" : "72vw",
      lg: showInfo ? "calc(68vw - 280px)" : "62vw",
      xl: showInfo ? "calc(60vw - 280px)" : "52vw",
    },
    h: { base: "42vh", sm: "48vh", md: "62vh", lg: "68vh" },
    maxW: "1000px",
    maxH: "720px",
  };
}

export default memo(PhotoViewer);
