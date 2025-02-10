import { FolderProps } from "@/mock/types";

type SelectedMediaStateType = {
  selected: number[];
};

type SelectedMediaActionType = {
  addMediaId: (id: number) => void;
  removeAllMediaIds: () => void;
  addMultipleMediaIds: (ids: number[]) => void;
  removeMediaId: (id: number) => void;
  removeMultipleMediaIds: (ids: number[]) => void;
};

export type SelectedMediaType = SelectedMediaStateType &
  SelectedMediaActionType;

type MediaStoreStateType = {
  folders: FolderProps[];
};

type MediaStoreActionType = {
  getFolder: (folderId: number) => FolderProps | undefined;
  getAllFiles: () => FolderProps["children"];
  addFolder: (folder: FolderProps["title"]) => void;
  removeFolder: (folderId: number) => void;
  updateFolder: (folder: FolderProps) => void;
  renameChild: (folderId: number, childId: number, title: string) => void;
  removeChild: (folderId: number, childId: number) => void;
  removeMultipleChildren: (folderId: number, childIds: number[]) => void;
  moveMediaToFolder: (mediaId: number, targetFolderId: number) => void;
};

export type MediaStoreType = MediaStoreStateType & MediaStoreActionType;
