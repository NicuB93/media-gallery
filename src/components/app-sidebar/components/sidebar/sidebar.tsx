// AppSidebar.tsx
import Logo from "@/assets/icons/logo.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";

import { FILTER_SECTION } from "@/mock/mock-data";
import { MediaTypes } from "@/mock/types";
import { useMediaStore } from "@/stores/media-store";
import { SidebarFolders } from "./sidebar-folders";
import { SidebarMediaFilter } from "./sidebar-media-filter";
import { NavigationArgFilterTypes } from "./types";

/**
 * The `AppSidebar` component renders the sidebar of the media gallery application.
 * It includes folder navigation and media type filters.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered sidebar component.
 *
 * @example
 * <AppSidebar />
 *
 * @remarks
 * This component uses several hooks and state management to handle folder navigation,
 * filter selection, and dialog state for adding new folders.
 *
 * @hook
 * - `useParams` to get the current folder ID from the URL.
 * - `useNavigate` to navigate between folders and apply filters.
 * - `useMediaStore` to access the media store containing folders and media files.
 * - `useState` to manage the state of the add folder dialog and filter checkboxes.
 *
 * @function handleOpenAddFolder
 * @param {boolean} open - The state to set for the add folder dialog.
 *
 * @function handleNavigate
 * @param {string | undefined} folderId - The ID of the folder to navigate to.
 * @param {NavigationArgFilterTypes[]} types - The types of media to filter by.
 *
 * @function handleParentChange
 * @param {boolean} checked - The state of the parent checkbox.
 *
 * @function handleChildChange
 * @param {number} id - The ID of the child checkbox.
 * @returns {(checked: boolean) => void} A function to handle the change event of the child checkbox.
 *
 * @function getChildren
 * @param {string | undefined} folderId - The ID of the folder to get children for.
 * @returns {MediaFile[]} The list of media files in the folder.
 */
export const AppSidebar = () => {
  const { folderId } = useParams({ strict: false });
  const navigate = useNavigate({ from: "/$folderId" });
  const mediaStore = useMediaStore();
  const folders = mediaStore.folders;

  // dialog state
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenAddFolder = (open: boolean) => {
    setIsOpen(open);
  };

  // checkboxes
  const [childChecked, setChildChecked] = useState<Record<number, boolean>>(
    () =>
      FILTER_SECTION.reduce(
        (acc, item) => {
          acc[item.id] = false;
          return acc;
        },
        {} as Record<number, boolean>
      )
  );

  const allChecked = Object.values(childChecked).every(Boolean);
  const noneChecked = Object.values(childChecked).every((checked) => !checked);
  const parentCheckboxValue: boolean | "indeterminate" = allChecked
    ? true
    : noneChecked
      ? false
      : "indeterminate";

  const handleNavigate = (
    folderId: string | undefined,
    types: NavigationArgFilterTypes[]
  ) => {
    navigate({
      to: folderId ? "/$folderId" : "/",
      ...(types.length && { search: { types: types } }),
    });
  };

  const handleParentChange = (checked: boolean) => {
    const selectedTypes = checked
      ? FILTER_SECTION.map((item) => item.type)
      : [];
    // Update child checkboxes
    setChildChecked((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((key) => {
        next[Number(key)] = checked;
      });
      return next;
    });

    // change the URL with updated filters based on folderId
    handleNavigate(folderId, selectedTypes);
  };

  const handleChildChange = (id: number) => (checked: boolean) => {
    setChildChecked((prev) => ({ ...prev, [id]: checked }));

    const updatedSelectedTypes = FILTER_SECTION.filter((item) =>
      id === item.id ? checked : Boolean(childChecked[item.id])
    ).map((item) => item.type);

    // change url with updated filters based on folderId
    handleNavigate(folderId, updatedSelectedTypes);
  };

  // aggregation
  const accumulatedTypes: Record<
    Exclude<MediaTypes, MediaTypes.FOLDER>,
    number
  > = {
    [MediaTypes.IMAGES]: 0,
    [MediaTypes.GIFS]: 0,
    [MediaTypes.VIDEOS]: 0,
  };

  const getChildren = (folderId?: string) => {
    if (folderId) {
      return mediaStore.getFolder(Number(folderId))?.children || [];
    }

    return mediaStore.getAllFiles() || [];
  };

  const filteredMediaAggregation = getChildren(folderId).reduce(
    (accum, child) => {
      if (child && child.type) {
        accum[child.type] += 1;
      }
      return accum;
    },
    accumulatedTypes
  );

  return (
    <Sidebar collapsible="none">
      <SidebarHeader>
        <Logo />
        <span className="text-lg text-shadow text-shadow-gray-400 text-shadow-y-lg text-shadow-blur-4">
          Media gallery
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm mb-2 text-black">
            Folders
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarFolders
              folderId={folderId}
              folders={folders}
              isOpen={isOpen}
              handleOpenAddFolder={handleOpenAddFolder}
            />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm mb-1 text-black">
            Filters
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMediaFilter
              parentCheckboxValue={parentCheckboxValue}
              handleParentChange={handleParentChange}
              childChecked={childChecked}
              handleChildChange={handleChildChange}
              filterSection={FILTER_SECTION}
              filteredMediaAggregation={filteredMediaAggregation}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
