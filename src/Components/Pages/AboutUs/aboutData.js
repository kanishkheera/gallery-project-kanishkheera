import {
  FiClock,
  FiCode,
  FiFolder,
  FiHeart,
  FiImage,
  FiSearch,
  FiShare2,
  FiZap,
  FiGrid,
} from "react-icons/fi";

export const ABOUT_ACCENT = "#8550D3";

export const features = [
  {
    icon: FiImage,
    title: "Discover Photos",
    description: "Explore a wide range of beautiful photography powered by the Unsplash API.",
  },
  {
    icon: FiSearch,
    title: "Search & Explore",
    description: "Find photographs based on keywords, topics, and interests.",
  },
  {
    icon: FiFolder,
    title: "Create Albums",
    description: "Organize selected photographs into albums and collections.",
  },
  {
    icon: FiHeart,
    title: "Save Favorites",
    description: "Keep the photographs you like most easily accessible.",
  },
  {
    icon: FiClock,
    title: "Recently Added",
    description: "Quickly revisit photographs that you've recently added.",
  },
  {
    icon: FiShare2,
    title: "Share Photos",
    description: "Share a photo directly from the viewer using your device's sharing options.",
  },
];

export const processSteps = [
  { number: "01", title: "Search", description: "Find photographs using keywords." },
  { number: "02", title: "Discover", description: "Explore photography from Unsplash." },
  { number: "03", title: "Favorite", description: "Save photographs you want to revisit." },
  { number: "04", title: "Organize", description: "Add selected photographs to albums." },
  { number: "05", title: "Share", description: "Send a photo link from the viewer." },
];

export const technologies = [
  { icon: FiCode, name: "React", description: "Component-based frontend development." },
  { icon: FiZap, name: "Vite", description: "Fast development and production builds." },
  { icon: FiGrid, name: "Chakra UI", description: "Responsive and accessible interface components." },
  { icon: FiImage, name: "Unsplash API", description: "Photography discovery and image data." },
];

export const discoveryLabels = ["Discover", "Organize", "Favorite", "Share"];
