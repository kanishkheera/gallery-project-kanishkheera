import { Flex, IconButton, SkeletonCircle, Text } from "@chakra-ui/react";
import {
  IoDownloadOutline,
  IoHeart,
  IoHeartOutline,
  IoInformationCircleOutline,
  IoShareSocialOutline,
  IoTrashOutline,
} from "react-icons/io5";

export default function PhotoActions({
  isCurrentReady,
  fullView,
  isFavorited,
  shareMessage,
  showInfo,
  onToggleFavorite,
  onShare,
  onToggleInfo,
  onDownload,
  onDelete,
}) {
  return (
    <Flex
      align="center"
      justify="flex-end"
      px={{ base: 3, md: 5 }}
      py={{ base: 2, md: 3 }}
      h={{ base: "44px", md: "52px" }}
      display={fullView ? "none" : "flex"}
      borderBottom="1px solid"
      borderColor="gray.200"
      flexShrink={0}
    >
      <Flex align="center" gap={{ base: 1, md: 2 }} flexShrink={0}>
        {isCurrentReady ? (
          <>
            <IconButton
              aria-label="Favorite"
              variant="ghost"
              size="sm"
              borderRadius="full"
              color={isFavorited ? "red.500" : "gray.600"}
              onClick={onToggleFavorite}
            >
              {isFavorited ? <IoHeart size={18} /> : <IoHeartOutline size={18} />}
            </IconButton>
            <IconButton
              aria-label="Share photo"
              title="Share photo"
              variant="ghost"
              size="sm"
              borderRadius="full"
              color="gray.600"
              onClick={onShare}
            >
              <IoShareSocialOutline size={18} />
            </IconButton>
            {shareMessage && (
              <Text fontSize="xs" color="purple.600" aria-live="polite">
                {shareMessage}
              </Text>
            )}
            <IconButton
              aria-label="Info"
              type="button"
              variant="ghost"
              size="sm"
              borderRadius="full"
              color={showInfo ? "blue.500" : "gray.600"}
              onClick={onToggleInfo}
            >
              <IoInformationCircleOutline size={18} />
            </IconButton>
            <IconButton
              aria-label="Download"
              variant="ghost"
              size="sm"
              borderRadius="full"
              color="gray.600"
              onClick={onDownload}
            >
              <IoDownloadOutline size={18} />
            </IconButton>
            <IconButton
              aria-label="Delete"
              variant="ghost"
              size="sm"
              borderRadius="full"
              color="gray.600"
              onClick={onDelete}
            >
              <IoTrashOutline size={18} />
            </IconButton>
          </>
        ) : (
          <>
            <SkeletonCircle size="8" />
            <SkeletonCircle size="8" />
            <SkeletonCircle size="8" />
            <SkeletonCircle size="8" />
            <SkeletonCircle size="8" />
          </>
        )}
      </Flex>
    </Flex>
  );
}
