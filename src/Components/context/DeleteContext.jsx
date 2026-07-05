import { createContext, useContext, useState, useEffect } from "react";

const DeletedContext = createContext(null);
const STORAGE_KEY = "gallery-deleted";

export const DeletedProvider = ({ children }) => {
  const [deleted, setDeleted] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deleted));
  }, [deleted]);

  const isDeleted = (photoId) => deleted.some((p) => p.id === photoId);

  const deletePhoto = (photo) => {
    setDeleted((prev) =>
      prev.some((p) => p.id === photo.id) ? prev : [...prev, photo]
    );
  };

  const restorePhoto = (photoId) => {
    setDeleted((prev) => prev.filter((p) => p.id !== photoId));
  };

  const permanentDelete = (photoId) => {
    setDeleted((prev) => prev.filter((p) => p.id !== photoId));
  };

  const permanentDeleteMany = (photoIds) => {
  setDeleted((prev) => prev.filter((p) => !photoIds.includes(p.id)));
};

  return (
    <DeletedContext.Provider
      value={{ deleted, isDeleted, deletePhoto, restorePhoto, permanentDelete, permanentDeleteMany }}
    >
      {children}
    </DeletedContext.Provider>
  );
};

export const useDeleted = () => {
  const ctx = useContext(DeletedContext);
  if (!ctx) {
    console.error("useDeleted() called outside <DeletedProvider>.");
    return {
      deleted: [],
      isDeleted: () => false,
      deletePhoto: () => {},
      restorePhoto: () => {},
      permanentDelete: () => {},
      permanentDeleteMany: () => {}
    };
  }
  return ctx;
};