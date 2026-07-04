import { useCallback } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { PhotoGallery } from "../PhotoGallery";
import usePhotoGallery from "../hooks/usePhotoGallery";

export default function SearchPhotos() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const fetchPhotos = useCallback(
    async (page) => {
      if (!query) return [];

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

      return res.data.results;
    },
    [query, API_KEY]
  );

  // `query` doubles as the resetKey — when the search term changes,
  // page/photos/selectedPhotoId reset just like the old inline effect did.
  const gallery = usePhotoGallery(fetchPhotos, query);

  return <PhotoGallery {...gallery} />;
}