import { albums } from "../data/albums";
import { navigationItems } from "../data/navigationItems";

export default function getNavbarPageTitle(pathname) {
  const albumPath = pathname.startsWith("/albums/") ? pathname.split("/")[2] : null;
  const albumName = albumPath ? albums.find((album) => album.path === albumPath)?.name : null;

  return albumName || navigationItems.find((item) => item.path === pathname)?.label || "Gallery";
}
