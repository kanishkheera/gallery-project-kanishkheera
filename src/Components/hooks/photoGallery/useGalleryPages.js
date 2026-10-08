import { useCallback, useEffect, useRef, useState } from "react";

export default function useGalleryPages(fetchPhotos, resetKey, searchParams) {
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const pendingAutoFetchRef = useRef(0);
  const searchParamsRef = useRef(searchParams);

  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  useEffect(() => {
    const loadPhotos = async () => {
      const pendingAutoFetchPageCount = pendingAutoFetchRef.current;
      const requestedPageCount = pendingAutoFetchPageCount || 1;
      pendingAutoFetchRef.current = 0;
      const firstRequestedPage = page - requestedPageCount + 1;
      const isAutoFetch = pendingAutoFetchPageCount > 0;

      setLoading(true);
      if (!isAutoFetch) setShowLoading(true);

      try {
        const pageResults = await Promise.all(
          Array.from({ length: requestedPageCount }, (_, index) =>
            fetchPhotos(firstRequestedPage + index),
          ),
        );
        const newPhotos = pageResults.flat();

        if (firstRequestedPage === 1) {
          setPhotos((previousPhotos) => {
            const sharedId = searchParamsRef.current.get("photo");
            const sharedPhoto = previousPhotos.find(
              (photo) => photo.id === sharedId && !newPhotos.some((newPhoto) => newPhoto.id === sharedId),
            );
            return sharedPhoto ? [sharedPhoto, ...newPhotos] : newPhotos;
          });
        } else {
          setPhotos((previousPhotos) => {
            const existingIds = new Set(previousPhotos.map((photo) => photo.id));
            return [...previousPhotos, ...newPhotos.filter((photo) => !existingIds.has(photo.id))];
          });
        }

        setHasMore(pageResults.at(-1)?.length > 0);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
      if (!isAutoFetch) setShowLoading(false);
    };

    loadPhotos();
  }, [page, fetchPhotos]);

  useEffect(() => {
    if (resetKey === null) return;
    const resetTimer = setTimeout(() => {
      setPage(1);
      setPhotos([]);
    }, 0);
    return () => clearTimeout(resetTimer);
  }, [resetKey]);

  const requestPages = useCallback((count = 1, isAutoFetch = false) => {
    pendingAutoFetchRef.current = isAutoFetch ? count : 0;
    setPage((currentPage) => currentPage + count);
  }, []);

  return {
    photos,
    setPhotos,
    loading,
    showLoading,
    hasMore,
    setPage,
    requestPages,
  };
}
