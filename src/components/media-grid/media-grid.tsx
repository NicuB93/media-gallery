import { cn } from "@/lib/utils";
import { useSelectedMedia } from "@/stores/selected-media-store";
import { useState } from "react";
import { DataSidebarProps, MediaTypes } from "../../mock/types";
import { Input } from "../ui/input";
import { MediaGridProps } from "./types";

type MediaGridPropsWithUpdate = MediaGridProps & {
  onTitleUpdate?: (id: number, newTitle: string) => void;
};

export function MediaGrid({
  mediaItems,
  onTitleUpdate,
}: MediaGridPropsWithUpdate) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const store = useSelectedMedia();
  const addMediaId = store.addMediaId;
  const removeMediaId = store.removeMediaId;
  const selectedIds = store.selected;

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      removeMediaId(id);
    } else {
      addMediaId(id);
    }
  };

  const isSelected = (id: number) => selectedIds.includes(id);

  const displayImagesAndGifs = (item: DataSidebarProps) =>
    (item.type === MediaTypes.IMAGES || item.type === MediaTypes.GIFS) &&
    !item.isFilter &&
    item.url && (
      <img
        src={item.url}
        alt={item.title}
        className="w-full h-auto object-contain rounded"
      />
    );

  const displayVideos = (item: DataSidebarProps) => {
    return (
      item.type === MediaTypes.VIDEOS &&
      !item.isFilter &&
      item.url && (
        <video
          src={item.url}
          className="w-full h-auto object-contain rounded"
          preload="metadata"
          muted
        />
      )
    );
  };

  const handleTitleDoubleClick = (item: DataSidebarProps) => {
    setEditingId(item.id);
    setEditTitle(item.title);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const finishEditing = (item: DataSidebarProps) => {
    if (onTitleUpdate) {
      onTitleUpdate(item.id, editTitle);
    }
    setEditingId(null);
  };

  const handleTitleBlur = (item: DataSidebarProps) => {
    finishEditing(item);
  };

  const handleTitleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    item: DataSidebarProps
  ) => {
    if (e.key === "Enter") {
      finishEditing(item);
    }
  };

  return (
    <div className="mt-2">
      <div className="grid grid-cols-6 gap-4 auto-rows-[1fr]">
        {mediaItems.map((item) => (
          <div key={item.id} className="h-full grid grid-rows-[1fr,auto]">
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
        ))}
      </div>
    </div>
  );
}
