import { useCallback } from "react";
import { PhotoGallery } from "../PhotoGallery";
import usePhotoGallery from "../hooks/usePhotoGallery";
import unsplashRequest from "../utils/unsplashRequest";

export default function RecentlyAdded() {
  const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const fetchPhotos = useCallback(
    async (page) => {
      return unsplashRequest("/photos", API_KEY, {
        page,
        per_page: 30,
        order_by: "latest",
      });
    },
    [API_KEY],
  );

  const gallery = usePhotoGallery(fetchPhotos);

  return <PhotoGallery {...gallery} />;
}
