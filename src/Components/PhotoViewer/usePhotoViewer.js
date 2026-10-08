import { useEffect } from "react";
import usePhotoViewerActions from "./usePhotoViewerActions";
import usePhotoViewerCarousel from "./usePhotoViewerCarousel";

export default function usePhotoViewer(options) {
  const {
    photos,
    selectedIndex,
    setSelectedPhotoId,
    onLoadMore,
    onClose,
    hasMore,
    loadingMore,
  } = options;

  const carousel = usePhotoViewerCarousel({
    photos,
    selectedIndex,
    setSelectedPhotoId,
    onLoadMore,
    hasMore,
    loadingMore,
  });
  const currentPhoto = photos[selectedIndex];
  const actions = usePhotoViewerActions(currentPhoto, carousel.goNext);
  const { goNext, goPrev } = carousel;
  const { handleDelete } = actions;

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "Delete") handleDelete();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [carousel.emblaApi, goNext, goPrev, handleDelete, onClose]);

  const handleImageLoad = (photoId) => {
    carousel.handleImageLoad(photoId, currentPhoto?.id);
  };

  return {
    ...carousel,
    ...actions,
    currentPhoto,
    isCurrentReady: Boolean(carousel.ready && currentPhoto && carousel.currentImageLoaded),
    handleImageLoad,
  };
}
