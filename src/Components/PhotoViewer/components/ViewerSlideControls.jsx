import { IconButton, SkeletonCircle } from "@chakra-ui/react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function ViewerSlideControls({
  goPrev,
  goNext,
  canScrollPrev,
  nextDisabled,
  isLastSlide,
  loadingMore,
}) {
  return (
    <>
      <IconButton
        aria-label="Previous"
        display={{ base: "none", md: "inline-flex" }}
        position="fixed"
        left="24px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={100}
        borderRadius="full"
        variant="ghost"
        color="whiteAlpha.800"
        _hover={{ bg: "whiteAlpha.200", color: "white" }}
        onClick={(event) => {
          event.stopPropagation();
          goPrev();
        }}
        disabled={!canScrollPrev}
      >
        <IoChevronBack size={30} />
      </IconButton>
      <IconButton
        aria-label="Next"
        display={{ base: "none", md: "inline-flex" }}
        position="fixed"
        right="24px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={100}
        borderRadius="full"
        variant="ghost"
        color="whiteAlpha.800"
        _hover={{ bg: "whiteAlpha.200", color: "white" }}
        onClick={(event) => {
          event.stopPropagation();
          goNext();
        }}
        disabled={nextDisabled}
      >
        {isLastSlide && loadingMore ? <SkeletonCircle size="7" /> : <IoChevronForward size={30} />}
      </IconButton>
    </>
  );
}
