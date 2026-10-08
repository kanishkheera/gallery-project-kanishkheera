import { Flex } from "@chakra-ui/react";
import PhotoActions from "./PhotoActions";
import PhotoInfoPanel from "./PhotoInfoPanel";
import PhotoMedia from "./PhotoMedia";

export default function PhotoViewerSlide({ photos, viewer, mediaSize }) {
  const {
    emblaRef,
    showInfo,
    setShowInfo,
    fullView,
    currentPhoto,
    isFavorited,
    shareMessage,
    isCurrentReady,
    handleDelete,
    handleDownload,
    handleImageLoad,
    handleToggleFavorite,
    handleShare,
  } = viewer;

  return (
    <Flex
      position="fixed"
      inset={0}
      justifyContent="center"
      alignItems="center"
      px={fullView ? 0 : { base: "10px", md: "24px", lg: "40px", xl: "60px" }}
      py={fullView ? 0 : { base: "10px", md: "24px", lg: "40px" }}
    >
      <Flex
        bg={fullView ? "transparent" : "white"}
        w={fullView ? "100vw" : "auto"}
        h={fullView ? "100dvh" : "auto"}
        maxW="100vw"
        maxH="100dvh"
        direction={{ base: "column", md: "row" }}
        overflow="hidden"
        onClick={(event) => event.stopPropagation()}
        borderRadius={fullView ? 0 : "8px"}
      >
        <Flex
          direction="column"
          minW={0}
          minH={0}
          w={mediaSize.w}
          h={fullView ? "100dvh" : "auto"}
        >
          <PhotoActions
            isCurrentReady={isCurrentReady}
            fullView={fullView}
            isFavorited={isFavorited}
            shareMessage={shareMessage}
            showInfo={showInfo}
            onToggleFavorite={(event) => {
              event.stopPropagation();
              handleToggleFavorite();
            }}
            onShare={(event) => {
              event.stopPropagation();
              handleShare(currentPhoto);
            }}
            onToggleInfo={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setShowInfo((current) => !current);
            }}
            onDownload={(event) => {
              event.stopPropagation();
              handleDownload(currentPhoto);
            }}
            onDelete={(event) => {
              event.stopPropagation();
              handleDelete();
            }}
          />
          <PhotoMedia
            photos={photos}
            emblaRef={emblaRef}
            fullView={fullView}
            mediaSize={mediaSize}
            isCurrentReady={isCurrentReady}
            onImageLoad={handleImageLoad}
          />
        </Flex>
        {showInfo && currentPhoto && !fullView && (
          <PhotoInfoPanel photo={currentPhoto} isReady={isCurrentReady} />
        )}
      </Flex>
    </Flex>
  );
}
