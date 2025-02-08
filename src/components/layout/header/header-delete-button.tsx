import { useMediaStore } from "@/stores/media-store";
import { useSelectedMedia } from "@/stores/selected-media-store";
import { useParams } from "@tanstack/react-router";

export const HeaderDeleteButton = () => {
  const selectedStore = useSelectedMedia();
  const mediaStore = useMediaStore();
  const selectedIds = selectedStore.selected;
  const { folderId } = useParams({ strict: false });
  const removeMultipleMediaIds = selectedStore.removeMultipleMediaIds;
  const removeMultipleChildren = mediaStore.removeMultipleChildren;

  const handleDelete = () => {
    if (folderId) {
      removeMultipleMediaIds(selectedIds);
      removeMultipleChildren(Number(folderId), selectedIds);
    }
  };

  return (
    selectedIds.length > 0 && (
      <button
        onClick={handleDelete}
        className="rounded bg-red-500 px-4 py-[6px] text-white hover:bg-red-600"
      >
        Delete Selected
      </button>
    )
  );
};
