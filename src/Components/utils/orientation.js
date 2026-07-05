export const getOrientation = (width, height) => {
  const ratio = width / height;
  if (Math.abs(ratio - 1) < 0.05) return "square";
  if (ratio > 1.6) return "wide";
  return ratio > 1 ? "landscape" : "portrait";
};

export const filterByOrientation = (photos, selected) =>
  selected === "all"
    ? photos
    : photos.filter((p) => getOrientation(p.width, p.height) === selected);