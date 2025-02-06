import Folder from "@/assets/icons/folder.svg";
import { FOLDER_SECTION } from "@/mock/mock-data";
import { FolderProps, MediaProps, MediaTypes } from "@/mock/types";
import { Draft } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  folders: FolderProps[];
};

type Action = {
  addFolder: (folder: FolderProps["title"]) => void;
  removeFolder: (folderId: number) => void;
  updateFolder: (folder: FolderProps) => void;
  renameChild: (folderId: number, childId: number, title: string) => void;
  removeChild: (folderId: number, childId: number) => void;
  removeMultipleChildren: (folderId: number, childIds: number[]) => void;
};

const getMediaFormat = (url: string) => {
  if (url.includes(".png") || url.includes(".jpg") || url.includes(".jpeg")) {
    return MediaTypes.IMAGES;
  }
  if (url.includes("gif")) {
    return MediaTypes.GIFS;
  }

  return MediaTypes.VIDEOS;
};

export const useMediaStore = create(
  immer<State & Action, [["zustand/immer", never]]>(
    (set: (fn: (state: Draft<State>) => void) => void) => ({
      folders: FOLDER_SECTION,

      addFolder: (folder) =>
        set((state) => {
          const fullFolder: FolderProps = {
            title: folder,
            id: state.folders.length + 1,
            type: MediaTypes.FOLDER,
            icon: Folder,
            children: [],
          };

          state.folders.push(fullFolder);
        }),

      removeFolder: (folderId) =>
        set((state) => {
          state.folders = state.folders.filter((f) => f.id !== folderId);
        }),

      updateFolder: (folder) =>
        set((state) => {
          const index = state.folders.findIndex((f) => f.id === folder.id);
          if (index !== -1) {
            // Merge updated folder properties
            state.folders[index] = { ...state.folders[index], ...folder };
          }
        }),

      renameChild: (folderId, childId, title) =>
        set((state) => {
          const folder = state.folders.find((f) => f.id === folderId);
          if (folder && folder.children) {
            const child = folder.children.find((c) => c.id === childId);
            if (child) {
              child.title = title;
            }
          }
        }),

      removeChild: (folderId, childId) =>
        set((state) => {
          const folder = state.folders.find((f) => f.id === folderId);
          if (folder && folder.children) {
            folder.children = folder.children.filter(
              (child) => child.id !== childId
            );
          }
        }),
      removeMultipleChildren: (folderId, childIds) =>
        set((state) => {
          const folder = state.folders.find((f) => f.id === folderId);
          if (folder && folder.children) {
            folder.children = folder.children.filter(
              (child) => !childIds.includes(child.id)
            );
          }
        }),
    })
  )
);

// Normally this wouldn't be a URL that then redirects to a different URL.
// This would be a file that has the exact extension and we get the media type precisely.
export const addChild = async (
  folderId: number,
  child: {
    title: string;
    url: string;
  }
) => {
  try {
    const response = await fetch(child.url);
    const completeUrl = response.url;

    useMediaStore.setState((state) => {
      const folder = state.folders.find((f) => f.id === folderId);
      if (folder) {
        folder.children = folder.children || [];
        const completeChild: MediaProps = {
          id: folder.children.length + 1,
          type: getMediaFormat(completeUrl),
          url: completeUrl,
          title: child.title,
        };
        folder.children.push(completeChild);
      }
    });
  } catch (error) {
    console.error("Error fetching complete URL:", error);
  }
};
