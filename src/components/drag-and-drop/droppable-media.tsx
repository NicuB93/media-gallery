import { useDroppable } from "@dnd-kit/core";
import { DroppableFolderProps } from "./types";

/**
 * A component that creates a droppable area for folders.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.folderId - The unique identifier for the folder.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the droppable area.
 *
 * @returns {JSX.Element} The droppable folder component.
 */
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
