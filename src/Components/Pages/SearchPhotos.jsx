import { Box, Center, Spinner, useBreakpointValue } from "@chakra-ui/react";
import axios from "axios";
import ImageCard from "../ImageCard";
import { useEffect, useRef, useState } from "react";
import "../Styles/masonry.css";
import Masonry from "react-masonry-css";
import PhotoViewer from "../PhotoViewer";
import { useSearchParams } from "react-router-dom";

export default function SearchPhotos() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const [searchParams] = useSearchParams();
  const resolvedPhotoRef = useRef(null);

  const query = searchParams.get("query");
  const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const fetchImages = async () => {
    if (!query) return;

    setLoading(true);

    try {
      const res = await axios.get("https://api.unsplash.com/search/photos", {
        headers: {
          Authorization: `Client-ID ${API_KEY}`,
        },
        params: {
          page,
          per_page: 30,
          query,
        },
      });

      const photos = res.data.results;

      if (page === 1) {
        // Merge-safe: preserve a directly-fetched shared photo instead of
        // wiping it out when the fresh search page lands.
        setData((prev) => {
          const sharedId = searchParams.get("photo");
          const sharedPhoto = prev.find(
            (p) =>
              p.id === sharedId && !photos.some((ph) => ph.id === sharedId),
          );
          return sharedPhoto ? [sharedPhoto, ...photos] : photos;
        });
      } else {
        setData((prev) => [...prev, ...photos]);
      }

      setHasMore(photos.length > 0);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    setData([]);
    setSelectedPhotoId(null);
  }, [query]);

  const selectedIndex =
    selectedPhotoId === null
      ? null
      : data.findIndex((photo) => photo.id === selectedPhotoId);

  useEffect(() => {
    fetchImages();
  }, [query, page]);

  // Open the viewer directly from a shared/reloaded URL, regardless of
  // whether the target photo is in the currently loaded search results.
  useEffect(() => {
    const photoId = searchParams.get("photo");
    if (!photoId || (selectedIndex !== null && selectedIndex !== -1)) return;

    const existingPhoto = data.find((p) => p.id === photoId);

    if (existingPhoto) {
      setSelectedPhotoId(existingPhoto.id);
      return;
    }

    if (resolvedPhotoRef.current === photoId) return;
    resolvedPhotoRef.current = photoId;

    let cancelled = false;

    axios
      .get(`https://api.unsplash.com/photos/${photoId}`, {
        headers: { Authorization: `Client-ID ${API_KEY}` },
      })
      .then((res) => {
        if (cancelled) return;
        const photo = res.data;

        setData((prev) => {
          if (prev.some((p) => p.id === photo.id)) return prev;
          return [photo, ...prev];
        });
        setSelectedPhotoId(photo.id);
      })
      .catch((err) => console.log(err));

    return () => {
      cancelled = true;
    };
  }, [searchParams, data]);

  useEffect(() => {
    if (!searchParams.get("photo")) {
      resolvedPhotoRef.current = null;
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

  const breakpointColumnsObj = {
    default: 5,
    1400: 4,
    768: 3,
    500: 2,
  };

  const gap = useBreakpointValue({
    base: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
  });

  return (
    <Box
      style={{
        "--gallery-gap": gap,
      }}
    >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {data.map((photo, index) => (
          <ImageCard
            key={photo.id}
            src={photo.urls.regular}
            onClick={() => setSelectedPhotoId(photo.id)}
          />
        ))}
      </Masonry>

      {selectedIndex !== null && selectedIndex !== -1 && (
        <PhotoViewer
          photos={data}
          selectedIndex={selectedIndex}
          setSelectedPhotoId={setSelectedPhotoId}
          hasMore={hasMore}
          loadingMore={loading}
          onLoadMore={() => {
            if (!loading && hasMore) setPage((prev) => prev + 1);
          }}
        />
      )}

      {loading && (
        <Center py={8}>
          <Spinner size="lg" />
        </Center>
      )}
    </Box>
  );
}
