import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";
import { MediaProps, MediaTypes } from "@/mock/types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { DNGMediaItemType } from "./types";

/**
 * DraggableMediaItem component represents a draggable media item that can be selected, edited, and displayed.
 *
 * @param {Object} props - The properties object.
 * @param {MediaProps} props.item - The media item to be displayed.
 * @param {Function} props.isSelected - Function to check if the item is selected.
 * @param {Function} props.toggleSelect - Function to toggle the selection of the item.
 * @param {string} props.editingId - The ID of the item currently being edited.
 * @param {Function} props.handleTitleDoubleClick - Function to handle double-click event on the title.
 * @param {string} props.editTitle - The current title being edited.
 * @param {Function} props.handleTitleChange - Function to handle changes to the title input.
 * @param {Function} props.handleTitleBlur - Function to handle blur event on the title input.
 * @param {Function} props.handleTitleKeyDown - Function to handle key down event on the title input.
 * @param {Array<string>} props.selectedIds - Array of selected item IDs.
 *
 * @returns {JSX.Element} The rendered DraggableMediaItem component.
 */
export const DraggableMediaItem = ({
  item,
  isSelected,
  toggleSelect,
  editingId,
  handleTitleDoubleClick,
  editTitle,
  handleTitleChange,
  handleTitleBlur,
  handleTitleKeyDown,
  selectedIds,
}: DNGMediaItemType) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: String(item.id),
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const displayImagesAndGifs = (item: MediaProps) =>
    (item.type === MediaTypes.IMAGES || item.type === MediaTypes.GIFS) &&
    item.url && (
      <img
        src={item.url}
        alt={item.title}
        className="w-full h-auto object-contain rounded"
      />
    );

  const displayVideos = (item: MediaProps) => {
    return (
      item.type === MediaTypes.VIDEOS &&
      item.url && (
        <video
          id="myVideo"
          src={item.url}
          className="w-full h-auto object-contain rounded"
          preload="metadata"
          controls
        />
      )
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="h-full grid grid-rows-[1fr,auto]"
    >
      <div
        className={cn(
          "relative cursor-pointer flex justify-center flex-col p-1",
          isSelected(item.id) &&
            "border border-[#1677FF] rounded-sm bg-[#1677FF30]"
        )}
        onClick={() => toggleSelect(item.id)}
      >
        {displayImagesAndGifs(item)}
        {displayVideos(item)}
        {isSelected(item.id) && (
          <div className="absolute bottom-2 left-2 flex h-6 w-6 items-center justify-center rounded-md bg-blue-500 text-white text-xs">
            {selectedIds.indexOf(item.id) + 1}
          </div>
        )}
      </div>
      <div
        className={cn(
          "flex justify-center h-6 w-full text-xs",
          isSelected(item.id) && "text-[#1677FF]"
        )}
        onDoubleClick={() => handleTitleDoubleClick(item)}
      >
        {editingId === item.id ? (
          <Input
            type="text"
            value={editTitle}
            onChange={handleTitleChange}
            onBlur={() => handleTitleBlur(item)}
            onKeyDown={(e) => handleTitleKeyDown(e, item)}
            className="text-xs text-center h-3"
            autoFocus
          />
        ) : (
          item.title
        )}
      </div>
    </div>
  );
};
