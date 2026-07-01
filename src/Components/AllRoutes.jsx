import { Text } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import AllPhotos from './Pages/AllPhotos'

export default function AllRoutes(){
    return<Routes>
        <Route path="/" element={<AllPhotos/>}/>
    </Routes>
}