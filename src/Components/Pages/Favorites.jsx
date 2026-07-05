import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PhotoGallery } from "../PhotoGallery";
import { useFavorites } from "../context/FavoritesContext";
import { useDeleted } from "../context/DeleteContext";
import { useFilter } from "../context/FilterContext";
import { filterByOrientation } from "../utils/orientation";

export default function Favorites() {
  const { favorites } = useFavorites();
  const { isDeleted } = useDeleted();
  const { selected } = useFilter();
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const photos = filterByOrientation(
    favorites.filter((p) => !isDeleted(p.id)),
    selected
  );

  const selectedIndex =
    selectedPhotoId === null
      ? null
      : photos.findIndex((photo) => photo.id === selectedPhotoId);

  const closeViewer = useCallback(() => {
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

  const onLoadMore = useCallback(() => {}, []);

  const gallery = {
    photos,
    loading: false,
    hasMore: false,
    selectedIndex,
    selectedPhotoId,
    setSelectedPhotoId,
    closeViewer,
    onLoadMore,
  };

  return <PhotoGallery {...gallery} />;
}