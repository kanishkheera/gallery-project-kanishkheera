import { useEffect, useState } from "react";
import unsplashRequest from "../../utils/unsplashRequest";

export default function useAboutPhotos() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    if (!accessKey) return undefined;

    let cancelled = false;
    unsplashRequest("/photos", accessKey, { page: 20, per_page: 30 })
      .then((data) => {
        if (!cancelled) setPhotos(data.slice(0, 4));
      })
      .catch(() => {
        // Keep the hero collage as placeholders when Unsplash is unavailable.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return photos;
}
