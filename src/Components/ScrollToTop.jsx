import { IconButton } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { IoArrowUp } from "react-icons/io5";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef(null);

  const stopScrollAnimation = useCallback(() => {
    const animation = animationRef.current;
    if (!animation) return;
    cancelAnimationFrame(animation.frameId);
    document.documentElement.style.scrollBehavior = animation.previousScrollBehavior;
    animationRef.current = null;
  }, []);

  useEffect(() => {
    stopScrollAnimation();
    window.scrollTo(0, 0);
  }, [pathname, stopScrollAnimation]);

  useEffect(() => () => stopScrollAnimation(), [stopScrollAnimation]);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 240);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const animateScrollToTop = () => {
    stopScrollAnimation();

    const startY = window.scrollY;
    if (startY <= 0) return;

    const duration = Math.min(1600, Math.max(700, startY * 0.65));
    const animation = {
      frameId: 0,
      startTime: null,
      previousScrollBehavior: document.documentElement.style.scrollBehavior,
    };
    animationRef.current = animation;
    document.documentElement.style.scrollBehavior = "auto";

    const step = (time) => {
      if (animation.startTime === null) animation.startTime = time;
      const progress = Math.min((time - animation.startTime) / duration, 1);
      const easedProgress = progress < 0.5
        ? 4 * progress ** 3
        : 1 - ((-2 * progress + 2) ** 3) / 2;

      window.scrollTo(0, startY * (1 - easedProgress));

      if (progress < 1) {
        animation.frameId = requestAnimationFrame(step);
      } else {
        document.documentElement.style.scrollBehavior = animation.previousScrollBehavior;
        animationRef.current = null;
      }
    };

    animation.frameId = requestAnimationFrame(step);
  };

  return isVisible ? (
    <IconButton
      aria-label="Scroll to top"
      title="Scroll to top"
      position="fixed"
      right={{ base: 4, md: 6 }}
      bottom={{ base: 4, md: 6 }}
      zIndex={1100}
      borderRadius="full"
      size="lg"
      bg="#8550D3"
      color="white"
      boxShadow="md"
      cursor="pointer"
      _hover={{ bg: "#7040BA", transform: "translateY(-2px)" }}
      onClick={animateScrollToTop}
    >
      <IoArrowUp size={20} />
    </IconButton>
  ) : null;
}
