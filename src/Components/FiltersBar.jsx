import { useState, useRef } from "react";
import {
  Button,
  Heading,
  Menu,
  Portal,
  Separator,
  HStack,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import {
  LuFilter,
  LuChevronDown,
  LuChevronUp,
  LuSquare,
  LuRectangleVertical,
  LuRectangleHorizontal,
  LuCheck
} from "react-icons/lu";
import { MdOutlineChecklistRtl } from "react-icons/md";


const FILTER_OPTIONS = [
  { value: "all", label: "Default", icon: MdOutlineChecklistRtl },
  { value: "square", label: "Square", icon: LuSquare },
  { value: "portrait", label: "Portrait", icon: LuRectangleVertical },
  { value: "landscape", label: "Landscape", icon: LuRectangleHorizontal },
  { value: "wide", label: "Wide", icon: LuRectangleHorizontal },
];

const CLOSE_DELAY = 150;

const FiltersBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const closeTimer = useRef(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = () => {
    clearCloseTimer();
    setIsOpen(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setIsOpen(false), CLOSE_DELAY);
  };

  return (
    <Box
      position="sticky"
      top={0}
      zIndex={20}
      py={2}
    //   bg="white"
      w="fit-content"
    >
      <Menu.Root
        open={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        // keeps the menu anchored to the viewport, not the scroll container,
        // so it doesn't jump/shift position while the grid scrolls beneath it
        positioning={{ placement: "bottom-start", strategy: "fixed", gutter: 8 }}
      >
        <Menu.Trigger asChild>
          <Button
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
            borderRadius="full"
            bg="#F4EEFF"
            color="#8550D3"
            _hover={{
              bg: "#E9DCFF",
              transform: "scale(1.05)",
            }}
          >
            <HStack gap={1}>
              <LuFilter size={22} />
              {isOpen ? <LuChevronUp size={18} /> : <LuChevronDown size={18} />}
            </HStack>
          </Button>
        </Menu.Trigger>

        <Portal>
          <Menu.Positioner onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
            <Menu.Content borderRadius="xl" boxShadow="lg" p={2} minW="220px">
              <Heading size="sm" px={2} py={1} color="gray.600">
                Filter by size
              </Heading>

              <Separator my={1} />

              <VStack align="stretch" gap={0.5}>
                {FILTER_OPTIONS.map(({ value, label, icon: Icon }) => {
                  const isSelected = selected === value;
                  return (
                    <Menu.Item
                      key={value}
                      value={value}
                      cursor="pointer"
                      borderRadius="md"
                      px={2}
                      py={2}
                      onSelect={() => {
                        setSelected(value);
                        setIsOpen(false);
                      }}
                      _hover={{ bg: "#F4EEFF" }}
                    >
                      <HStack justify="space-between" w="full">
                        <HStack gap={2}>
                          <Icon size={16} color={isSelected ? "#8550D3" : "#6B7280"} />
                          <Text
                            fontSize="sm"
                            color={isSelected ? "#8550D3" : "gray.700"}
                            fontWeight={isSelected ? "semibold" : "normal"}
                          >
                            {label}
                          </Text>
                        </HStack>
                        {isSelected && (
                          <Box color="#8550D3">
                            <LuCheck size={16} />
                          </Box>
                        )}
                      </HStack>
                    </Menu.Item>
                  );
                })}
              </VStack>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Box>
  );
};

export default FiltersBar;