import { Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export default function AlbumDetail() {
  const { albumPath } = useParams();
  return <Text>{albumPath}</Text>;
}
