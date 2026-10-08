import { useCallback } from "react";
import { PhotoGallery } from "../PhotoGallery";
import usePhotoGallery from "../hooks/usePhotoGallery";
import unsplashRequest from "../utils/unsplashRequest";

export default function AllPhotos() {
  const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const START_PAGE = 20;

  const fetchPhotos = useCallback(
    async (page) => {
      return unsplashRequest("/photos", API_KEY, {
        page: page + START_PAGE - 1,
        per_page: 30,
      });
    },
    [API_KEY],
  );

  const gallery = usePhotoGallery(fetchPhotos);

  return <PhotoGallery {...gallery} />;
}
