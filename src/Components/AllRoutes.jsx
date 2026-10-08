import { Routes, Route } from "react-router-dom";
import AllPhotos from "./Pages/AllPhotos";
import Albums from "./Pages/Albums";
import Favorites from "./Pages/Favorites";
import RecentlyAdded from "./Pages/RecentlyAdded";
import DeletedItems from "./Pages/DeletedItems";
import SearchPhotos from "./Pages/SearchPhotos";
import AlbumDetail from "./Pages/AlbumDetail";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";


const allPageRoute = [
  { path: "/", element: <AllPhotos /> },
  { path: "/albums", element: <Albums /> },
  { path: "/albums/:albumPath", element: <AlbumDetail /> },
  { path: "/favorites", element: <Favorites /> },
  { path: "/recent", element: <RecentlyAdded /> },
  { path: "/trash", element: <DeletedItems /> },
  { path: "/search", element: <SearchPhotos /> },
  { path: "/about", element: <AboutUs /> },
  { path: "/contact", element: <ContactUs /> },
];

export default function AllRoutes() {
  return (
    <Routes>
      {allPageRoute.map((page) => (
        <Route
          key={page.path}
          path={page.path}
          element={page.element}
        />
      ))}
    </Routes>
  );
}
