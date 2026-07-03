import { Text } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import AllPhotos from "./Pages/AllPhotos";
import Albums from "./Pages/Albums";
import Favorites from "./Pages/Favorites";
import RecentlyAdded from "./Pages/RecentlyAdded";
import DeletedItems from "./Pages/DeletedItems";
import Settings from "./Pages/Settings";
import SearchPhotos from "./Pages/SearchPhotos";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AllPhotos />} />
      <Route path="/albums" element={<Albums />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/recent" element={<RecentlyAdded />} />
      <Route path="/trash" element={<DeletedItems />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/search" element={<SearchPhotos />} />
    </Routes>
  );
}
