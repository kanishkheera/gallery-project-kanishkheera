const initialState = { items: [] };

export const DELETE_PHOTO = "deleted/deletePhoto";
export const RESTORE_PHOTO = "deleted/restorePhoto";
export const RESTORE_PHOTOS = "deleted/restoreMany";

export const deletePhoto = (photo) => ({ type: DELETE_PHOTO, payload: photo });
export const restorePhoto = (photoId) => ({ type: RESTORE_PHOTO, payload: photoId });
export const restoreMany = (photoIds) => ({ type: RESTORE_PHOTOS, payload: photoIds });

export default function deletedReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_PHOTO:
      if (!action.payload || state.items.some((photo) => photo.id === action.payload.id)) return state;
      return { ...state, items: [...state.items, action.payload] };
    case RESTORE_PHOTO:
    case RESTORE_PHOTOS: {
      const ids = new Set(action.type === RESTORE_PHOTO ? [action.payload] : action.payload);
      return {
        ...state,
        items: state.items.filter((photo) => !ids.has(photo.id)),
      };
    }
    default:
      return state;
  }
}

export const selectDeleted = (state) => state.deleted.items;
export const selectIsDeleted = (photoId) => (state) =>
  state.deleted.items.some((photo) => photo.id === photoId);
