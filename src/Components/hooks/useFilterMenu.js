import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "../../store/hooks";
import { selectSelectedFilter, setSelectedFilter } from "../../store/slices/filtersSlice";

const CLOSE_DELAY = 150;

export default function useFilterMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const selected = useSelector(selectSelectedFilter);
  const dispatch = useDispatch();
  const closeTimer = useRef(null);

  const clearCloseTimer = () => {
    if (!closeTimer.current) return;
    clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const openMenu = () => {
    clearCloseTimer();
    setIsOpen(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setIsOpen(false), CLOSE_DELAY);
  };

  const selectFilter = (value) => {
    dispatch(setSelectedFilter(value));
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => clearCloseTimer, []);

  return { isOpen, setIsOpen, selected, openMenu, scheduleClose, selectFilter };
}
