import { useSelectedMedia } from "@/stores/selected-media-store";
import { useParams } from "@tanstack/react-router";
import { useState } from "react";
import { AddMediaDialog } from "./header-add-media-dialog";
import { HeaderCheckbox } from "./header-checkbox";
import { HeaderDeleteButton } from "./header-delete-button";
import { HeaderSelectFolder } from "./header-folder-select";
import { SearchInput } from "./header-search-input";

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
          <HeaderDeleteButton />
          <AddMediaDialog
            isOpen={isOpen}
            handleOpenAddFolder={handleOpenAddFolder}
          />
        </>
      )}
    </header>
  );
};
