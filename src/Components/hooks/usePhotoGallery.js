import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useFilteredGallery from "./photoGallery/useFilteredGallery";
import useGalleryPages from "./photoGallery/useGalleryPages";
import useGalleryPhotoSelection from "./photoGallery/useGalleryPhotoSelection";

export default function usePhotoGallery(fetchPhotos, resetKey = null) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pages = useGalleryPages(fetchPhotos, resetKey, searchParams);
  const { filteredPhotos, waitingForFilteredResults } = useFilteredGallery({
    photos: pages.photos,
    loading: pages.loading,
    hasMore: pages.hasMore,
    requestPages: pages.requestPages,
  });
  const selection = useGalleryPhotoSelection({
    photos: pages.photos,
    filteredPhotos,
    resetKey,
    setPhotos: pages.setPhotos,
    searchParams,
    setSearchParams,
  });
  const { loading, hasMore, requestPages } = pages;

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;
      if (nearBottom && !loading && hasMore) requestPages();
    };

    window.addEventListener("scroll", handleScroll);
    if (!loading && filteredPhotos.length > 0) handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, requestPages, filteredPhotos.length]);

  const onLoadMore = useCallback(() => {
    if (!loading && hasMore) requestPages();
  }, [loading, hasMore, requestPages]);

  return {
    photos: filteredPhotos,
    loading: pages.loading,
    showLoading: pages.showLoading,
    waitingForFilteredResults,
    hasMore: pages.hasMore,
    selectedIndex: selection.selectedIndex,
    selectedPhotoId: selection.selectedPhotoId,
    setSelectedPhotoId: selection.setSelectedPhotoId,
    closeViewer: selection.closeViewer,
    onLoadMore,
  };
}
