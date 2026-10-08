const initialState = { selected: "all" };

export const SET_FILTER = "filters/setSelected";
export const setSelectedFilter = (selected) => ({
  type: SET_FILTER,
  payload: selected,
});
const validFilters = new Set(["all", "portrait", "landscape"]);

export default function filtersReducer(state = initialState, action) {
  return action.type === SET_FILTER && validFilters.has(action.payload)
    ? { ...state, selected: action.payload }
    : state;
}

export const selectSelectedFilter = (state) =>
  validFilters.has(state.filters.selected) ? state.filters.selected : "all";
