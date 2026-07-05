import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFilter } from "../context/FilterContext";
import { filterByOrientation } from "../utils/orientation";

export default function usePhotoGallery(fetchPhotos, resetKey = null) {
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const { selected } = useFilter();

  const [searchParams, setSearchParams] = useSearchParams();
  const resolvedPhotoRef = useRef(null);
  const closingRef = useRef(false);

  const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const filteredPhotos = useMemo(
    () => filterByOrientation(photos, selected),
    [photos, selected],
  );

  // Capped auto-fetch: keep pulling more pages while a filter has thinned
  // results too much, but never more than MAX_AUTO_FETCH extra pages —
  // prevents runaway fetch loops on narrow filters.
  const autoFetchCountRef = useRef(0);
  const MAX_AUTO_FETCH = 5;

  useEffect(() => {
    if (selected === "all") {
      autoFetchCountRef.current = 0;
      return;
    }

    const MIN_FILTERED = 12;

    if (
      filteredPhotos.length < MIN_FILTERED &&
      hasMore &&
      !loading &&
      autoFetchCountRef.current < MAX_AUTO_FETCH
    ) {
      const timer = setTimeout(() => {
        autoFetchCountRef.current += 1;
        setPage((prev) => prev + 1);
      }, 400); // small gap so fetches don't all fire back-to-back

      return () => clearTimeout(timer);
    }
  }, [selected, filteredPhotos.length, hasMore, loading]);

  // FIX: must search filteredPhotos, since that's the array PhotoViewer
  // actually receives as `photos`. Searching the unfiltered array here
  // was the cause of "click one photo, viewer shows a different one."
  const selectedIndex =
    selectedPhotoId === null
      ? null
      : filteredPhotos.findIndex((photo) => photo.id === selectedPhotoId);

  const loadPhotos = async () => {
    setLoading(true);

    try {
      const newPhotos = await fetchPhotos(page);

      if (page === 1) {
        setPhotos((prev) => {
          const sharedId = searchParams.get("photo");

          const sharedPhoto = prev.find(
            (p) =>
              p.id === sharedId && !newPhotos.some((ph) => ph.id === sharedId),
          );

          return sharedPhoto ? [sharedPhoto, ...newPhotos] : newPhotos;
        });
      } else {
        setPhotos((prev) => [...prev, ...newPhotos]);
      }

      setHasMore(newPhotos.length > 0);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadPhotos();
  }, [page, fetchPhotos]);

  useEffect(() => {
    if (resetKey === null) return;

    setPage(1);
    setPhotos([]);
    setSelectedPhotoId(null);
  }, [resetKey]);

  useEffect(() => {
    if (closingRef.current) return;

    const photoId = searchParams.get("photo");
    if (!photoId || (selectedIndex !== null && selectedIndex !== -1)) return;

    const existingPhoto = photos.find((p) => p.id === photoId);

    if (existingPhoto) {
      setSelectedPhotoId(existingPhoto.id);
      return;
    }

    if (resolvedPhotoRef.current === photoId) return;
    resolvedPhotoRef.current = photoId;

    let cancelled = false;

    axios
      .get(`https://api.unsplash.com/photos/${photoId}`, {
        headers: {
          Authorization: `Client-ID ${API_KEY}`,
        },
      })
      .then((res) => {
        if (cancelled) return;

        const photo = res.data;

        setPhotos((prev) => {
          if (prev.some((p) => p.id === photo.id)) return prev;
          return [photo, ...prev];
        });

        setSelectedPhotoId(photo.id);
      })
      .catch(console.log);

    return () => {
      cancelled = true;
    };
  }, [photos, searchParams, selectedIndex, API_KEY]);

  useEffect(() => {
    if (!searchParams.get("photo")) {
      resolvedPhotoRef.current = null;
    }
  }, [searchParams]);

  useEffect(() => {
    if (closingRef.current && !searchParams.get("photo")) {
      closingRef.current = false;
    }
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 200 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  const onLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  const closeViewer = useCallback(() => {
    closingRef.current = true;
    resolvedPhotoRef.current = null;
    setSelectedPhotoId(null);

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete("photo");
        return next;
      },
      { replace: true },
    );
  }, [setSearchParams]);

  return {
    photos: filteredPhotos,
    loading,
    hasMore,
    selectedIndex,
    selectedPhotoId,
    setSelectedPhotoId,
    closeViewer,
    onLoadMore,
  };
}
