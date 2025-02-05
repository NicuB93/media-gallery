import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { MediaTypes } from "../app-sidebar/types";
import { MediaGridProps } from "./types";

export function MediaGrid({ mediaItems, folderId }: MediaGridProps) {
  const [items, setItems] = useState(mediaItems);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    setItems(mediaItems);
  }, [folderId]);

  const toggleSelect = (id: number) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleDelete = () => {
    setItems((prev) => prev.filter((item) => !selected.includes(item.id)));
    setSelected([]);
  };

  return (
    <div>
      <div className="grid grid-cols-6 gap-4 auto-rows-[1fr]">
        {items.map((item) => (
          <div key={item.id} className="h-full">
            <div
              className={cn(
                "relative cursor-pointer flex justify-center flex-col p-1",
                selected.includes(item.id) &&
                  "border-1 border-[#1677FF] rounded-sm bg-[#1677FF30]"
              )}
              onClick={() => toggleSelect(item.id)}
            >
              {(item.type === MediaTypes.IMAGES ||
                item.type === MediaTypes.GIFS) &&
                !item.isFilter &&
                item.url && (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-auto object-contain rounded"
                  />
                )}
              {item.type === MediaTypes.VIDEOS &&
                !item.isFilter &&
                item.url && (
                  <video
                    src={item.url}
                    className="w-full h-auto object-contain rounded"
                    preload="metadata"
                    muted
                  />
                )}
              {selected.includes(item.id) && (
                <div className="absolute bottom-2 left-2 flex h-6 w-6 items-center justify-center rounded-md bg-blue-500 text-white text-xs">
                  {selected.indexOf(item.id) + 1}
                </div>
              )}
            </div>
            <span className="flex justify-center h-6 w-full text-xs">
              {item.title}
            </span>
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <button
          onClick={handleDelete}
          className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Delete Selected
        </button>
      )}
    </div>
  );
}
