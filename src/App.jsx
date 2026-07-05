import { Box, Button, HStack } from "@chakra-ui/react";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import AllRoutes from "./Components/AllRoutes";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Sidebar />
      <Box ml={{ base: "0", xl: "260px" }}>
        <Navbar />
        <Box mx={4} mt={3}>
          <AllRoutes />
        </Box>
      </Box>
    </>
  );
}

export default App;