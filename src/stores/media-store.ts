import Folder from "@/assets/icons/folder.svg";
import { FOLDER_SECTION } from "@/mock/mock-data";
import { FolderProps, MediaProps, MediaTypes } from "@/mock/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { MediaStoreType } from "./types";

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
  immer<MediaStoreType, [["zustand/immer", never]]>((set) => ({
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
    // this is for dng
    moveMediaToFolder: (mediaId: number, targetFolderId: number) => {
      set((state) => {
        // First, find the folder that currently contains the media item.
        let mediaToMove: any = null;
        let sourceFolderIndex = state.folders.findIndex((folder) => {
          const found = folder.children?.find((child) => child.id === mediaId);
          if (found) {
            mediaToMove = found;
            return true;
          }
          return false;
        });

        // If the media item was found, remove it from its current folder.
        if (mediaToMove && sourceFolderIndex > -1) {
          const sourceFolder = state.folders[sourceFolderIndex];
          sourceFolder.children = sourceFolder.children?.filter(
            (child) => child.id !== mediaId
          );
        }

        // Now, find the target folder and add the media item.
        const targetFolder = state.folders.find(
          (folder) => folder.id === targetFolderId
        );
        if (targetFolder) {
          targetFolder.children = targetFolder.children || [];
          targetFolder.children.push(mediaToMove);
        }
      });
    },
  }))
);

// this was done async because we are fetching the complete url, because in case we get a redirect url like from picsum
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
