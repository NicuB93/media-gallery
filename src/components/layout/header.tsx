import { useSelectedMedia } from "@/stores/selected-media-store";
import { useState } from "react";
import { AddMediaDialog } from "./add-media-dialog";
import { CheckboxWithText } from "./header-checkbox";
import { HeaderDeleteButton } from "./header-delete-button";
import { HeaderSelect } from "./header-folder-select";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const store = useSelectedMedia();

  const handleOpenAddFolder = (open: boolean) => {
    setIsOpen(open);
  };

  const selectedIds = store.selected;

  return (
    <header className="flex items-center pl-2 gap-6 border-b h-[64px] w-full">
      <CheckboxWithText>{selectedIds.length} selected</CheckboxWithText>
      <HeaderSelect />
      <HeaderDeleteButton />
      <AddMediaDialog
        isOpen={isOpen}
        handleOpenAddFolder={handleOpenAddFolder}
      />
    </header>
  );
};
