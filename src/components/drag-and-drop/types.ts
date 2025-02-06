import { DataSidebarProps } from "@/mock/types";

export type DNGMediaItemType = {
  item: DataSidebarProps;
  isSelected: (id: number) => boolean;
  toggleSelect: (id: number) => void;
  editingId: number | null;
  handleTitleDoubleClick: (item: DataSidebarProps) => void;
  editTitle: string;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTitleBlur: (item: DataSidebarProps) => void;
  handleTitleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    item: DataSidebarProps
  ) => void;
  selectedIds: number[];
};
