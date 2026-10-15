import { useEffect, useMemo, useState } from "react";
import { useSelector } from "../../../store/hooks";
import { selectSelectedFilter } from "../../../store/slices/filtersSlice";
import { selectDeleted } from "../../../store/slices/deletedSlice";
import { filterByOrientation } from "../../utils/orientation";

const FILTER_TARGET_COUNT = 1;
const GALLERY_PAGE_SIZE = 30;
const MAX_ORIENTATION_FETCH_PAGES = 2;

export default function useFilteredGallery({ photos, loading, hasMore, requestPages, ignoreFilter = false }) {
  const selected = useSelector(selectSelectedFilter);
  const activeFilter = ignoreFilter ? "all" : selected;
  const deletedPhotos = useSelector(selectDeleted);
  const [autoFetchState, setAutoFetchState] = useState(() => ({ filter: selected, count: 0 }));
  const autoFetchCount = autoFetchState.filter === activeFilter ? autoFetchState.count : 0;

  const filteredPhotos = useMemo(
    () => filterByOrientation(photos, activeFilter).filter(
      (photo) => !deletedPhotos.some((deletedPhoto) => deletedPhoto.id === photo.id),
    ),
    [photos, activeFilter, deletedPhotos],
  );

  useEffect(() => {
    const targetCount = activeFilter === "all" ? GALLERY_PAGE_SIZE : FILTER_TARGET_COUNT;
    const maxFetchPages = activeFilter === "all" ? Number.POSITIVE_INFINITY : MAX_ORIENTATION_FETCH_PAGES;
    const shouldFetchMore =
      activeFilter === "all"
        ? photos.length > 0 && filteredPhotos.length < targetCount
        : filteredPhotos.length < targetCount;

    if (!shouldFetchMore) {
      if (autoFetchState.filter !== activeFilter || autoFetchState.count > 0) {
        setAutoFetchState({ filter: activeFilter, count: 0 });
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
      const batchSize = activeFilter === "all" ? 1 : Math.min(2, maxFetchPages - autoFetchCount);
      setAutoFetchState({ filter: activeFilter, count: autoFetchCount + batchSize });
      requestPages(batchSize, true);
    }, 100);

    return () => clearTimeout(timer);
  }, [activeFilter, photos.length, filteredPhotos.length, hasMore, loading, requestPages, autoFetchCount, autoFetchState]);

  const targetCount = activeFilter === "all" ? GALLERY_PAGE_SIZE : FILTER_TARGET_COUNT;
  const maxFetchPages = activeFilter === "all" ? Number.POSITIVE_INFINITY : MAX_ORIENTATION_FETCH_PAGES;
  const waitingForFilteredResults =
    filteredPhotos.length < targetCount &&
    hasMore &&
    (loading ||
      autoFetchState.filter !== activeFilter ||
      autoFetchCount < maxFetchPages);

  return { selected: activeFilter, filteredPhotos, waitingForFilteredResults };
}
