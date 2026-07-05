import { createContext, useContext, useState, useEffect } from "react";

const FilterContext = createContext(null);
const STORAGE_KEY = "gallery-filter-selected";

export const FilterProvider = ({ children }) => {
  const [selected, setSelected] = useState(
    () => localStorage.getItem(STORAGE_KEY) || "all"
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, selected);
  }, [selected]);

  return (
    <FilterContext.Provider value={{ selected, setSelected }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) {
    console.error(
      "useFilter() called outside <FilterProvider>. Check that Provider.jsx wraps your app."
    );
    return { selected: "all", setSelected: () => {} };
  }
  return ctx;
};