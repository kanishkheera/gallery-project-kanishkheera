import { IconButton } from "@chakra-ui/react";
import { IoClose, IoContractOutline, IoExpandOutline } from "react-icons/io5";

export default function ViewerWindowControls({ fullView, setFullView, setShowInfo, onClose }) {
  return (
    <>
      <IconButton
        aria-label={fullView ? "Exit full view" : "View full screen"}
        title={fullView ? "Exit full view" : "View full screen"}
        position="fixed"
        top={{ base: "12px", md: "20px" }}
        right={{ base: "56px", md: "72px" }}
        zIndex={100}
        size={{ base: "sm", md: "md" }}
        borderRadius="full"
        bg="whiteAlpha.900"
        color="black"
        _hover={{ bg: "white" }}
        onClick={(event) => {
          event.stopPropagation();
          setShowInfo(false);
          setFullView((current) => !current);
        }}
      >
        {fullView ? <IoContractOutline size={20} /> : <IoExpandOutline size={20} />}
      </IconButton>
      <IconButton
        aria-label="Close"
        position="fixed"
        top={{ base: "12px", md: "20px" }}
        right={{ base: "12px", md: "20px" }}
        zIndex={100}
        size={{ base: "sm", md: "md" }}
        borderRadius="full"
        bg="whiteAlpha.900"
        color="black"
        _hover={{ bg: "white" }}
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
      >
        <IoClose size={20} />
      </IconButton>
    </>
  );
}
