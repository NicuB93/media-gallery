import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

type DroppableFolderProps = {
  folderId: number;
  children: ReactNode;
};

export const DroppableFolder = ({
  folderId,
  children,
}: DroppableFolderProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `folder-${folderId}`,
  });

  const style = {
    backgroundColor: isOver ? "rgba(21, 101, 192, 0.2)" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};
