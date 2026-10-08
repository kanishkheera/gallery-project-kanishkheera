import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function usePhotoViewerCarousel({
  photos,
  selectedIndex,
  setSelectedPhotoId,
  onLoadMore,
  hasMore,
  loadingMore,
}) {
  // Embla's duration controls attraction strength: lower values ease more slowly.
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, duration: 12 });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [fullView, setFullView] = useState(false);
  const [currentImageLoaded, setCurrentImageLoaded] = useState(false);
  const loadedIdsRef = useRef(new Set());
  const initializedApiRef = useRef(null);
  const prevIndexRef = useRef(selectedIndex);
  const pendingAdvanceRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (!emblaApi) return undefined;

    const onSelect = () => {
      const newIndex = emblaApi.selectedScrollSnap();
      setSelectedPhotoId(photos[newIndex]?.id);
      setCurrentImageLoaded(loadedIdsRef.current.has(photos[newIndex]?.id));
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());

      if (prevIndexRef.current !== newIndex) {
        setShowInfo(false);
        prevIndexRef.current = newIndex;
      }
    };

    // Position instantly only when the viewer first initializes. selectedIndex
    // changes as the user navigates; resetting here would cancel each animation.
    if (initializedApiRef.current !== emblaApi) {
      emblaApi.scrollTo(selectedIndex, true);
      initializedApiRef.current = emblaApi;
      prevIndexRef.current = selectedIndex;
    }
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    const frameId = requestAnimationFrame(onSelect);

    return () => {
      cancelAnimationFrame(frameId);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, photos, selectedIndex, setSelectedPhotoId]);

  useEffect(() => {
    if (!emblaApi) return undefined;
    const frameId = requestAnimationFrame(() => emblaApi.reInit());
    return () => cancelAnimationFrame(frameId);
  }, [showInfo, emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    if (pendingAdvanceRef.current && emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
      pendingAdvanceRef.current = false;
    }
  }, [photos.length, emblaApi]);

  const goNext = () => {
    if (!emblaApi) return;
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
      return;
    }
    if (hasMore && !loadingMore) {
      pendingAdvanceRef.current = true;
      onLoadMore?.();
    }
  };

  const goPrev = () => emblaApi?.scrollPrev();

  const handleImageLoad = (photoId, currentPhotoId) => {
    loadedIdsRef.current.add(photoId);
    if (photoId === currentPhotoId) setCurrentImageLoaded(true);
  };

  return {
    emblaRef,
    canScrollPrev,
    canScrollNext,
    showInfo,
    setShowInfo,
    fullView,
    setFullView,
    ready: Boolean(emblaApi),
    currentImageLoaded,
    isLastSlide: !canScrollNext,
    nextDisabled: !canScrollNext && !hasMore && !loadingMore,
    goNext,
    goPrev,
    handleImageLoad,
  };
}
