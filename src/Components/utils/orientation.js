export const getOrientation = (width, height) => {
  // Persisted photo data can contain dimensions as numeric strings. Normalize
  // them before comparing so those photos are included in the right filter.
  const photoWidth = Number(width);
  const photoHeight = Number(height);
  if (!Number.isFinite(photoWidth) || !Number.isFinite(photoHeight) || photoHeight <= 0 || photoWidth <= 0) {
    return "unknown";
  }

  if (photoWidth === photoHeight) return "square";
  return photoWidth > photoHeight ? "landscape" : "portrait";
};

export const filterByOrientation = (photos, selected) =>
  selected === "all"
    ? photos
    : photos.filter((photo) => getOrientation(photo.width, photo.height) === selected);
