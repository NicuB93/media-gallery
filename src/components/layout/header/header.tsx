import { useSelectedMedia } from "@/stores/selected-media-store";
import { useParams } from "@tanstack/react-router";
import { useState } from "react";
import { AddMediaDialog } from "./header-add-media-dialog";
import { HeaderCheckbox } from "./header-checkbox";
import { HeaderDeleteButton } from "./header-delete-button";
import { HeaderSelectFolder } from "./header-folder-select";
import { SearchInput } from "./header-search-input";

/**
 * The `Header` component renders the header section of the media gallery app.
 * It includes a search input, folder selection, and conditional elements based on the presence of a `folderId`.
 *
 * @component
 *
 * @example
 * return (
 *   <Header />
 * )
 *
 * @returns {JSX.Element} The rendered header component.
 *
 * @remarks
 * - Uses `useState` to manage the state of the `AddMediaDialog` component.
 * - Uses `useParams` to retrieve the `folderId` from the URL.
 * - Uses `useSelectedMedia` to get the selected media items from the store.
 *
 * @function
 * @name Header
 */
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { folderId } = useParams({ strict: false });

  const store = useSelectedMedia();

  const handleOpenAddFolder = (open: boolean) => {
    setIsOpen(open);
  };

  const selectedIds = store.selected;

  return (
    <header className="flex items-center pl-2 gap-6 border-b h-[64px] w-full">
      <SearchInput />
      <HeaderSelectFolder />
      {folderId && (
        <>
          <HeaderCheckbox>{selectedIds.length} selected</HeaderCheckbox>
          <AddMediaDialog
            isOpen={isOpen}
            handleOpenAddFolder={handleOpenAddFolder}
          />
          <HeaderDeleteButton />
        </>
      )}
    </header>
  );
};
