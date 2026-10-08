import { VStack } from "@chakra-ui/react";
import AboutCallToAction from "./AboutUs/AboutCallToAction";
import AboutDeveloper from "./AboutUs/AboutDeveloper";
import AboutFeatures from "./AboutUs/AboutFeatures";
import AboutFooter from "./AboutUs/AboutFooter";
import AboutHero from "./AboutUs/AboutHero";
import AboutOverview from "./AboutUs/AboutOverview";
import AboutProcess from "./AboutUs/AboutProcess";
import AboutTechnologies from "./AboutUs/AboutTechnologies";
import AboutUnsplash from "./AboutUs/AboutUnsplash";
import ContactSocials from "./ContactUs/ContactSocials";
import useAboutPhotos from "./AboutUs/useAboutPhotos";

export default function AboutUs() {
  const photos = useAboutPhotos();

  return (
    <VStack
      align="stretch"
      gap={{ base: 8, md: 16, xl: 20 }}
      maxW="1180px"
      mx="auto"
      px={{ base: 2, md: 7, xl: 10 }}
      py={{ base: 8, md: 12, xl: 14 }}
    >
      <AboutHero photos={photos} />
      <AboutOverview />
      <AboutFeatures />
      <AboutProcess />
      <AboutUnsplash />
      <AboutTechnologies />
      <AboutDeveloper />
      <ContactSocials />
      <AboutCallToAction />
      <AboutFooter />
    </VStack>
  );
}
