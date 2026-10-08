const initialState = { items: [] };

export const TOGGLE_FAVORITE = "favorites/toggle";

export const toggleFavorite = (photo) => ({ type: TOGGLE_FAVORITE, payload: photo });

export default function favoritesReducer(state = initialState, action) {
  if (action.type !== TOGGLE_FAVORITE || !action.payload) return state;

  const exists = state.items.some((photo) => photo.id === action.payload.id);
  return {
    ...state,
    items: exists
      ? state.items.filter((photo) => photo.id !== action.payload.id)
      : [...state.items, action.payload],
  };
}

export const selectFavorites = (state) => state.favorites.items;
export const selectIsFavorite = (photoId) => (state) =>
  state.favorites.items.some((photo) => photo.id === photoId);
