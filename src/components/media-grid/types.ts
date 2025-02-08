import { DataSidebarProps } from "../../mock/types";

export type MediaGridProps = {
  mediaItems: DataSidebarProps[];
  onTitleUpdate?: (id: number, newTitle: string) => void;
  disabledSelection?: boolean;
};
