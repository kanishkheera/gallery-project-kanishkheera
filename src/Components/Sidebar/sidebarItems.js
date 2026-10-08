import { MdOutlinePhotoSizeSelectActual, MdAccessTime } from "react-icons/md";
import { IoAlbumsOutline } from "react-icons/io5";
import { GrFavorite } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiInfo, FiMail } from "react-icons/fi";

export const primarySidebarItems = [
  { icon: MdOutlinePhotoSizeSelectActual, label: "All Photos", path: "/" },
  { icon: IoAlbumsOutline, label: "Albums", path: "/albums" },
  { icon: GrFavorite, label: "Favorites", path: "/favorites" },
  { icon: MdAccessTime, label: "Recently Added", path: "/recent" },
];

export const deletedSidebarItems = [
  { icon: RiDeleteBin6Line, label: "Deleted Items", path: "/trash" },
];

export const infoSidebarItems = [
  { icon: FiInfo, label: "About Us", path: "/about" },
  { icon: FiMail, label: "Contact Us", path: "/contact" },
];
