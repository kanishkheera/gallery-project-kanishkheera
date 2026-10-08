import { useEffect, useMemo, useState } from "react";
import { useSelector } from "../../../store/hooks";
import { selectSelectedFilter } from "../../../store/slices/filtersSlice";
import { selectDeleted } from "../../../store/slices/deletedSlice";
import { filterByOrientation } from "../../utils/orientation";

const FILTER_TARGET_COUNT = 1;
const GALLERY_PAGE_SIZE = 30;
const MAX_ORIENTATION_FETCH_PAGES = 2;

export default function useFilteredGallery({ photos, loading, hasMore, requestPages }) {
  const selected = useSelector(selectSelectedFilter);
  const deletedPhotos = useSelector(selectDeleted);
  const [autoFetchState, setAutoFetchState] = useState(() => ({ filter: selected, count: 0 }));
  const autoFetchCount = autoFetchState.filter === selected ? autoFetchState.count : 0;

  const filteredPhotos = useMemo(
    () => filterByOrientation(photos, selected).filter(
      (photo) => !deletedPhotos.some((deletedPhoto) => deletedPhoto.id === photo.id),
    ),
    [photos, selected, deletedPhotos],
  );

  useEffect(() => {
    const targetCount = selected === "all" ? GALLERY_PAGE_SIZE : FILTER_TARGET_COUNT;
    const maxFetchPages = selected === "all" ? Number.POSITIVE_INFINITY : MAX_ORIENTATION_FETCH_PAGES;
    const shouldFetchMore =
      selected === "all"
        ? photos.length > 0 && filteredPhotos.length < targetCount
        : filteredPhotos.length < targetCount;

    if (!shouldFetchMore) {
      if (autoFetchState.filter !== selected || autoFetchState.count > 0) {
        setAutoFetchState({ filter: selected, count: 0 });
      }
      return undefined;
    }

    if (
      !hasMore ||
      loading ||
      autoFetchCount >= maxFetchPages
    ) {
      return undefined;
    }

    const timer = setTimeout(() => {
      const batchSize = selected === "all" ? 1 : Math.min(2, maxFetchPages - autoFetchCount);
      setAutoFetchState({ filter: selected, count: autoFetchCount + batchSize });
      requestPages(batchSize, true);
    }, 100);

    return () => clearTimeout(timer);
  }, [selected, photos.length, filteredPhotos.length, hasMore, loading, requestPages, autoFetchCount, autoFetchState]);

  const targetCount = selected === "all" ? GALLERY_PAGE_SIZE : FILTER_TARGET_COUNT;
  const maxFetchPages = selected === "all" ? Number.POSITIVE_INFINITY : MAX_ORIENTATION_FETCH_PAGES;
  const waitingForFilteredResults =
    filteredPhotos.length < targetCount &&
    hasMore &&
    (loading ||
      autoFetchState.filter !== selected ||
      autoFetchCount < maxFetchPages);

  return { selected, filteredPhotos, waitingForFilteredResults };
}
