import { useCallback, useEffect, useRef, useState } from "react";
import unsplashRequest from "../../utils/unsplashRequest";

export default function useGalleryPhotoSelection({
  photos,
  filteredPhotos,
  resetKey,
  setPhotos,
  searchParams,
  setSearchParams,
}) {
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const resolvedPhotoRef = useRef(null);
  const closingRef = useRef(false);
  const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const selectedIndex = selectedPhotoId === null
    ? null
    : filteredPhotos.findIndex((photo) => photo.id === selectedPhotoId);

  useEffect(() => {
    if (resetKey === null) return undefined;
    const resetTimer = setTimeout(() => setSelectedPhotoId(null), 0);
    return () => clearTimeout(resetTimer);
  }, [resetKey]);

  useEffect(() => {
    if (closingRef.current) return undefined;

    const photoId = searchParams.get("photo");
    if (!photoId || (selectedIndex !== null && selectedIndex !== -1)) return undefined;

    const existingPhoto = photos.find((photo) => photo.id === photoId);
    if (existingPhoto) {
      const frameId = requestAnimationFrame(() => setSelectedPhotoId(existingPhoto.id));
      return () => cancelAnimationFrame(frameId);
    }

    if (resolvedPhotoRef.current === photoId) return undefined;
    resolvedPhotoRef.current = photoId;
    let cancelled = false;

    unsplashRequest(`/photos/${photoId}`, apiKey)
      .then((photo) => {
        if (cancelled) return;
        setPhotos((previousPhotos) => {
          if (previousPhotos.some((item) => item.id === photo.id)) return previousPhotos;
          return [photo, ...previousPhotos];
        });
        setSelectedPhotoId(photo.id);
      })
      .catch(console.log);

    return () => {
      cancelled = true;
    };
  }, [photos, searchParams, selectedIndex, apiKey, setPhotos]);

  useEffect(() => {
    if (!searchParams.get("photo")) resolvedPhotoRef.current = null;
    if (closingRef.current && !searchParams.get("photo")) closingRef.current = false;
  }, [searchParams]);

  const closeViewer = useCallback(() => {
    closingRef.current = true;
    resolvedPhotoRef.current = null;
    setSelectedPhotoId(null);
    setSearchParams((previousParams) => {
      const nextParams = new URLSearchParams(previousParams);
      nextParams.delete("photo");
      return nextParams;
    }, { replace: true });
  }, [setSearchParams]);

  return { selectedPhotoId, selectedIndex, setSelectedPhotoId, closeViewer };
}
