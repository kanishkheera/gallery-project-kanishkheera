import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { PhotoGallery } from "../PhotoGallery";
import usePhotoGallery from "../hooks/usePhotoGallery";
import unsplashRequest from "../utils/unsplashRequest";

export default function SearchPhotos() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const fetchPhotos = useCallback(
    async (page) => {
      if (!query) return [];

      const data = await unsplashRequest("/search/photos", API_KEY, {
        page,
        per_page: 30,
        query,
      });

      return data.results;
    },
    [query, API_KEY]
  );

  // `query` doubles as the resetKey — when the search term changes,
  // page/photos/selectedPhotoId reset just like the old inline effect did.
  const gallery = usePhotoGallery(fetchPhotos, query);

  return <PhotoGallery {...gallery} />;
}
