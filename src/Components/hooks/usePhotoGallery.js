import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function usePhotoGallery(fetchPhotos, resetKey = null) {
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const resolvedPhotoRef = useRef(null);
  const closingRef = useRef(false); // guards against the URL-sync effect reopening the viewer

  const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const selectedIndex =
    selectedPhotoId === null
      ? null
      : photos.findIndex((photo) => photo.id === selectedPhotoId);

  const loadPhotos = async () => {
    setLoading(true);

    try {
      const newPhotos = await fetchPhotos(page);

      if (page === 1) {
        setPhotos((prev) => {
          const sharedId = searchParams.get("photo");

          const sharedPhoto = prev.find(
            (p) =>
              p.id === sharedId &&
              !newPhotos.some((ph) => ph.id === sharedId)
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

  // Open the viewer directly from a shared/reloaded URL, regardless of
  // whether the target photo is in the currently loaded page of results.
  useEffect(() => {
    if (closingRef.current) return; // we just closed — don't let a stale URL reopen it

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

  // Once the URL actually reflects the close (param gone), release the guard.
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

  // Single source of truth for closing the viewer: clears state AND strips
  // ?photo= from the URL together, so the URL-sync effect above has nothing
  // stale to reopen on the next render. This is what makes close() work on
  // the first click instead of the second.
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
      { replace: true }
    );
  }, [setSearchParams]);

  return {
    photos,
    loading,
    hasMore,
    selectedIndex,
    selectedPhotoId,
    setSelectedPhotoId,
    closeViewer,
    onLoadMore,
  };
}