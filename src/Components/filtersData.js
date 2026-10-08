import {
  LuRectangleVertical,
  LuRectangleHorizontal,
} from "react-icons/lu";
import { MdOutlineChecklistRtl } from "react-icons/md";

export const FILTER_OPTIONS = [
  { value: "all", label: "Default Size", icon: MdOutlineChecklistRtl },
  { value: "portrait", label: "Portrait", icon: LuRectangleVertical },
  { value: "landscape", label: "Landscape", icon: LuRectangleHorizontal },
];
