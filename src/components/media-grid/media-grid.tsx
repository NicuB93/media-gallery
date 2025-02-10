import { MediaProps } from "@/mock/types";
import { useSelectedMedia } from "@/stores/selected-media-store";
import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DraggableMediaItem } from "../drag-and-drop/draggable-media";
import { MediaGridProps } from "./types";

export const MediaGrid = ({
  mediaItems,
  disabledSelection,
  onTitleUpdate,
}: MediaGridProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const params = useParams({ strict: false });

  const store = useSelectedMedia();
  const addMediaId = store.addMediaId;
  const removeMediaId = store.removeMediaId;
  const removeAllMediaIds = store.removeAllMediaIds;
  const selectedIds = store.selected;

  const toggleSelect = (id: number) => {
    // disable selection if root folder is displayed
    if (disabledSelection) {
      return;
    }

    if (selectedIds.includes(id)) {
      removeMediaId(id);
    } else {
      addMediaId(id);
    }
  };

  const isSelected = (id: number) => selectedIds.includes(id);

  // Inline title editing handlers.
  const handleTitleDoubleClick = (item: MediaProps) => {
    if (onTitleUpdate) {
      setEditingId(item.id);
      setEditTitle(item.title);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const finishEditing = (item: MediaProps) => {
    if (onTitleUpdate) {
      onTitleUpdate(item.id, editTitle);
    }
    setEditingId(null);
  };

  const handleTitleBlur = (item: MediaProps) => {
    finishEditing(item);
  };

  const handleTitleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    item: MediaProps
  ) => {
    if (e.key === "Enter") {
      finishEditing(item);
    }
  };

  useEffect(() => {
    removeAllMediaIds();
  }, [params]);

  return (
    <div className="mt-2 p-2">
      <div className="grid grid-cols-6 gap-4 auto-rows-[1fr]">
        {mediaItems.map((item) => (
          <DraggableMediaItem
            key={item.id}
            item={item}
            isSelected={isSelected}
            toggleSelect={toggleSelect}
            editingId={editingId}
            handleTitleDoubleClick={handleTitleDoubleClick}
            editTitle={editTitle}
            handleTitleChange={handleTitleChange}
            handleTitleBlur={handleTitleBlur}
            handleTitleKeyDown={handleTitleKeyDown}
            selectedIds={selectedIds}
          />
        ))}
      </div>
    </div>
  );
};
