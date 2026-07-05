import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext(null);
const STORAGE_KEY = "gallery-favorites";

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorited = (photoId) => favorites.some((p) => p.id === photoId);

  const toggleFavorite = (photo) => {
    setFavorites((prev) =>
      prev.some((p) => p.id === photo.id)
        ? prev.filter((p) => p.id !== photo.id)
        : [...prev, photo]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorited, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    console.error("useFavorites() called outside <FavoritesProvider>.");
    return { favorites: [], isFavorited: () => false, toggleFavorite: () => {} };
  }
  return ctx;
};