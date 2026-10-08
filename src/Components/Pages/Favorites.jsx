import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PhotoGallery } from "../PhotoGallery";
import { useSelector } from "../../store/hooks";
import { selectFavorites } from "../../store/slices/favoritesSlice";
import { selectDeleted } from "../../store/slices/deletedSlice";
import { selectSelectedFilter } from "../../store/slices/filtersSlice";
import { filterByOrientation } from "../utils/orientation";

export default function Favorites() {
  const favorites = useSelector(selectFavorites);
  const deleted = useSelector(selectDeleted);
  const selected = useSelector(selectSelectedFilter);
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const [, setSearchParams] = useSearchParams();

  const availableFavorites = useMemo(
    () => favorites.filter(
      (photo) => !deleted.some((deletedPhoto) => deletedPhoto.id === photo.id),
    ),
    [favorites, deleted],
  );
  const photos = useMemo(
    () => filterByOrientation(availableFavorites, selected),
    [availableFavorites, selected],
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
    emptyMessage:
      availableFavorites.length === 0
        ? "No favorite photos found. Add photos to your favorites to see them here."
        : "No favorite photos match this filter.",
  };

  return <PhotoGallery {...gallery} />;
}
