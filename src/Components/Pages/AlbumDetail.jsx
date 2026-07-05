import axios from "axios";
import { useCallback } from "react";
import { PhotoGallery } from "../PhotoGallery";
import usePhotoGallery from "../hooks/usePhotoGallery";
import { useParams } from "react-router-dom";

export default function AlbumDetail() {
  const { albumPath } = useParams();
  const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const fetchPhotos = useCallback(
    async (page) => {
      const res = await axios.get("https://api.unsplash.com/search/photos", {
        headers: {
          Authorization: `Client-ID ${API_KEY}`,
        },
        params: {
          page,
          per_page: 30,
          query: albumPath,
        },
      });

      return res.data.results;
    },
    [API_KEY, albumPath], // fixed: refetch when album changes
  );

  const gallery = usePhotoGallery(fetchPhotos, albumPath); // fixed: reset state per album

  return <PhotoGallery {...gallery} />;
}