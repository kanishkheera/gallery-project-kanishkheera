import { Box, Center, Grid, Spinner, Text, useBreakpointValue, } from "@chakra-ui/react";
import axios from "axios";
import ImageCard from "../ImageCard";
import { useEffect, useState } from "react";
import "../Styles/masonry.css";
import Masonry from "react-masonry-css";
import ChangePagination from "../ChangePagination";

export default function AllPhotos() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `https://api.unsplash.com/photos?page=${page}&per_page=30`,
          {
            headers: {
              Authorization: `Client-ID ${API_KEY}`,
            },
          },
        );

        setData((prev) => [...prev, ...res.data]);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    fetchPhotos();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 200 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  const breakpointColumnsObj = {
    default: 5,
    1400: 4,
    // 1100: 3,
    // 768: 2,
    500: 3,
  };

  const gap = useBreakpointValue({
    base: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
  });

  return (
    <Box
      style={{
        "--gallery-gap": gap,
      }}
    >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {data.map((photo) => (
          <ImageCard key={photo.id} src={photo.urls.regular} />
        ))}
      </Masonry>
      {loading && (
        <Center py={8}>
          <Spinner size="lg" />
        </Center>
      )}
    </Box>
  );
}
