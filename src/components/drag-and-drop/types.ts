import { MediaProps } from "@/mock/types";
import { ReactNode } from "react";

export type DNGMediaItemType = {
  item: MediaProps;
  isSelected: (id: number) => boolean;
  toggleSelect: (id: number) => void;
  editingId: number | null;
  handleTitleDoubleClick: (item: MediaProps) => void;
  editTitle: string;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTitleBlur: (item: MediaProps) => void;
  handleTitleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    item: MediaProps
  ) => void;
  selectedIds: number[];
};

export type DroppableFolderProps = {
  folderId: number;
  children: ReactNode;
};
