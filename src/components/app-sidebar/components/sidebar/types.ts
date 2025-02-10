import { FilterProps, FolderProps, MediaTypes } from "@/mock/types";

export type SidebarFoldersProps = {
  folderId: string | undefined;
  folders: FolderProps[];
  isOpen: boolean;
  handleOpenAddFolder: (open: boolean) => void;
};

export type SidebarMediaFilterProps = {
  parentCheckboxValue: boolean | "indeterminate";
  handleParentChange: (checked: boolean) => void;
  childChecked: Record<number, boolean>;
  handleChildChange: (id: number) => (checked: boolean) => void;
  filterSection: FilterProps[];
  filteredMediaAggregation: Record<
    Exclude<MediaTypes, MediaTypes.FOLDER>,
    number
  >;
};

export type NavigationArgFilterTypes =
  | MediaTypes.IMAGES
  | MediaTypes.VIDEOS
  | MediaTypes.GIFS
  | undefined;
