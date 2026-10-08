import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "../../../store/hooks";
import { restoreMany, restorePhoto, selectDeleted } from "../../../store/slices/deletedSlice";
import { selectSelectedFilter } from "../../../store/slices/filtersSlice";
import { filterByOrientation } from "../../utils/orientation";

export default function useDeletedItems() {
  const deleted = useSelector(selectDeleted);
  const selected = useSelector(selectSelectedFilter);
  const dispatch = useDispatch();

  const photos = useMemo(() => filterByOrientation(deleted, selected), [deleted, selected]);
  const handleRestore = useCallback(
    (photoId) => dispatch(restorePhoto(photoId)),
    [dispatch],
  );
  const restoreAll = useCallback(
    () => dispatch(restoreMany(deleted.map((photo) => photo.id))),
    [deleted, dispatch],
  );

  return { deleted, photos, handleRestore, restoreAll };
}
