import axios from "axios";
import { useCallback } from "react";
import { PhotoGallery } from "../PhotoGallery";
import usePhotoGallery from "../hooks/usePhotoGallery";

export default function RecentlyAdded() {
  const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const fetchPhotos = useCallback(
    async (page) => {
      const res = await axios.get("https://api.unsplash.com/photos", {
        headers: {
          Authorization: `Client-ID ${API_KEY}`,
        },
        params: {
          page,
          per_page: 30,
          order_by: "latest",
        },
      });

      return res.data;

      return res.data;
    },
    [API_KEY],
  );

  const gallery = usePhotoGallery(fetchPhotos);

  return <PhotoGallery {...gallery} />;
}
