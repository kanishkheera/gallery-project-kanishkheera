import { combineReducers, createStore } from "redux";
import favoritesReducer from "./slices/favoritesSlice";
import deletedReducer from "./slices/deletedSlice";
import filtersReducer from "./slices/filtersSlice";
import { loadPersistedState, persistState } from "./storage";

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  deleted: deletedReducer,
  filters: filtersReducer,
});

export const store = createStore(rootReducer, loadPersistedState());
store.subscribe(() => persistState(store.getState()));

export default store;
