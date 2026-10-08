import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "../../store/hooks";
import { selectIsFavorite, toggleFavorite } from "../../store/slices/favoritesSlice";
import { deletePhoto } from "../../store/slices/deletedSlice";

export default function usePhotoViewerActions(currentPhoto, goNext) {
  const [shareMessage, setShareMessage] = useState("");
  const dispatch = useDispatch();
  const isFavorited = useSelector(selectIsFavorite(currentPhoto?.id));
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!currentPhoto) return;
    const params = new URLSearchParams(searchParams);
    if (params.get("photo") !== currentPhoto.id) {
      params.set("photo", currentPhoto.id);
      setSearchParams(params, { replace: true });
    }
  }, [currentPhoto, searchParams, setSearchParams]);

  const handleDelete = () => {
    if (!currentPhoto) return;
    dispatch(deletePhoto(currentPhoto));
    goNext();
  };

  const handleToggleFavorite = () => {
    if (currentPhoto) dispatch(toggleFavorite(currentPhoto));
  };

  const handleShare = async (photo) => {
    if (!photo) return;
    const currentPath = window.location.pathname;
    // Album routes are public Unsplash searches, so keep that route in the
    // shared link. Favorites are local to each browser, so share those from
    // the public All Photos route instead.
    const sharePath = currentPath.startsWith("/albums/") ? currentPath : "/";
    const shareUrl = new URL(sharePath, window.location.origin);
    shareUrl.searchParams.set("photo", photo.id);

    try {
      if (navigator.share) {
        await navigator.share({ title: "Gallery photo", url: shareUrl.toString() });
        return;
      }
      await navigator.clipboard.writeText(shareUrl.toString());
      setShareMessage("Link copied");
      window.setTimeout(() => setShareMessage(""), 2000);
    } catch (error) {
      if (error.name !== "AbortError") console.error("Sharing photo failed:", error);
    }
  };

  const handleDownload = async (photo) => {
    try {
      const response = await fetch(photo.urls.full);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${photo.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return { isFavorited, shareMessage, handleDelete, handleToggleFavorite, handleShare, handleDownload };
}
