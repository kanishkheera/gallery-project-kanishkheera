import { Box } from "@chakra-ui/react";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import AllRoutes from "./Components/AllRoutes";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Sidebar />
      <Box ml={{ base: "0", xl: "260px" }} minW={0}>
        <Navbar />
        <Box mx={{ base: 1, md: 4 }} mt={{ base: 2, md: 3 }} minW={0}>
          <AllRoutes />
        </Box>
      </Box>
    </>
  );
}

export default App;
