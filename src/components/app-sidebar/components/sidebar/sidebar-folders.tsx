import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils/cn";
import { Link } from "@tanstack/react-router";

import Folder from "@/assets/icons/folder.svg";

import { DroppableFolder } from "../../../drag-and-drop/droppable-media";
import { AddNewFolderDialog } from "./sidebar-add-new-folder-dialog";
import { SidebarFoldersProps } from "./types";

/**
 * SidebarFolders component renders a list of folders in the sidebar menu.
 * Each folder is represented as a clickable link that navigates to the folder's content.
 * It also includes a button to add a new folder.
 *
 * @param {SidebarFoldersProps} props - The props for the SidebarFolders component.
 * @param {string} props.folderId - The ID of the currently selected folder.
 * @param {Array} props.folders - An array of folder objects to be displayed.
 * @param {boolean} props.isOpen - A boolean indicating whether the add folder dialog is open.
 * @param {Function} props.handleOpenAddFolder - A function to handle opening the add folder dialog.
 *
 * @returns {JSX.Element} The rendered SidebarFolders component.
 */
export const SidebarFolders = ({
  folderId,
  folders,
  isOpen,
  handleOpenAddFolder,
}: SidebarFoldersProps) => {
  return (
    <SidebarMenu>
      {folders.map((item) => (
        <DroppableFolder key={item.id} folderId={item.id}>
          <SidebarMenuItem>
            <SidebarMenuButton
              className={cn(folderId === String(item.id) && "bg-slate-100")}
              asChild
            >
              <Link to={`/$folderId`} params={{ folderId: String(item.id) }}>
                <Folder />
                <span>{item.title}</span>
                <span className="text-gray-400">{item.children?.length}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </DroppableFolder>
      ))}
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <AddNewFolderDialog
            isOpen={isOpen}
            handleOpenAddFolder={handleOpenAddFolder}
          />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
