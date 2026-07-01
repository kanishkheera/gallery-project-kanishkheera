import {
  Box,
  VStack,
  Button,
  Heading,
  HStack,
  Image,
  Text,
  Separator,
} from "@chakra-ui/react";
import {
  MdOutlinePhotoSizeSelectActual,
  MdAccessTime,
  MdOutlineSettings,
} from "react-icons/md";
import { IoAlbumsOutline } from "react-icons/io5";
import { FaRegFolderOpen } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const menuItems1 = [
  {
    icon: MdOutlinePhotoSizeSelectActual,
    label: "All Photos",
    path: "/",
  },
  {
    icon: IoAlbumsOutline,
    label: "Albums",
    path: "/albums",
  },
  {
    icon: FaRegFolderOpen,
    label: "Folders",
    path: "/folders",
  },
  {
    icon: GrFavorite,
    label: "Favorites",
    path: "/favorites",
  },
  {
    icon: MdAccessTime,
    label: "Recently Added",
    path: "/recent",
  },
];

const menuItems2 = [
  {
    icon: RiDeleteBin6Line,
    label: "Deleted Items",
    path: "/trash",
  },
  {
    icon: MdOutlineSettings,
    label: "Settings",
    path: "/settings",
  },
];

export default function SidebarContent({ onItemClick }) {
  return (
    <>
      <HStack justify={"flex-start" }>
        <Image src="/logo.png" w={"100px"} />
        <VStack gap="1px" >
          <Heading size="2xl" as="h1">
            Gallery
          </Heading>
          <Heading size="lg" as="h3">
            by Kanishk
          </Heading>
        </VStack>
      </HStack>

      <VStack w="90%" m="auto" align="stretch" gap={2} mt="20px" mb="60px">
        {menuItems1.map(({ icon: Icon, label, path }) => (
          <NavLink key={label} to={path} onClick={onItemClick}>
            {({ isActive }) => (
              <HStack
                justify={"flex-start"}
                gap={3}
                p={3}
                borderRadius="md"
                cursor="pointer"
                bg={isActive ? "purple.100" : "transparent"}
                color={isActive ? "purple.600" : "inherit"}
                transition="0.2s"
                _hover={{
                  bg: "purple.100",
                  color: "purple.600",
                }}
              >
                <Icon size={20} />
                <Text>{label}</Text>
              </HStack>
            )}
          </NavLink>
        ))}
      </VStack>

      <Separator />
      {/* <Text>OTHER</Text> */}

      <VStack w="90%" m="auto" align="stretch" gap={2} mt="20px" mb="60px">
        {menuItems2.map(({ icon: Icon, label, path }) => (
          <NavLink key={label} to={path} onClick={onItemClick}>
            {({ isActive }) => (
              <HStack
                justify={ "flex-start" }
                gap={3}
                p={3}
                borderRadius="md"
                cursor="pointer"
                bg={isActive ? "purple.100" : "transparent"}
                color={isActive ? "purple.600" : "inherit"}
                transition="0.2s"
                _hover={{
                  bg: "purple.100",
                  color: "purple.600",
                }}
              >
                <Icon size={20} />
                <Text>{label}</Text>
              </HStack>
            )}
          </NavLink>
        ))}
      </VStack>
    </>
  );
}
