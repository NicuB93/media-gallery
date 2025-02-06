import { Checkbox } from "@/components/ui/checkbox";
import { useMediaStore } from "@/stores/media-store";
import { useSelectedMedia } from "@/stores/selected-media-store";
import { useParams } from "@tanstack/react-router";
import { ReactNode, useEffect } from "react";
import { MediaTypes } from "../../mock/types";

export const CheckboxWithText = ({ children }: { children?: ReactNode }) => {
  const { folderId } = useParams({ strict: false });
  const selectedMediaStore = useSelectedMedia();
  const mediaStore = useMediaStore();
  const selectedIds = selectedMediaStore.selected;

  const folder = mediaStore.folders.find(
    (f) => f.type === MediaTypes.FOLDER && f.id === Number(folderId)
  );
  const getCheckboxState = () => {
    if (!folder) {
      return false;
    }
    if ("children" in folder) {
      if (folder.children?.length === 0) {
        return false;
      }

      if (selectedIds.length && selectedIds.length < folder.children?.length!) {
        return "indeterminate";
      }
      return selectedIds.length === folder.children?.length;
    }
    return false;
  };

  const getDisabledState = () => {
    if (!folder || folder.children?.length === 0) {
      return true;
    }
    return false;
  };

  const onCheckboxChange = (checked: boolean) => {
    if (!folder || !("children" in folder)) {
      return;
    }

    if (checked) {
      selectedMediaStore.addMultipleMediaIds(folder.children!.map((f) => f.id));
    } else {
      selectedMediaStore.addMultipleMediaIds([]);
    }
  };

  // useEffect to reset the checkbox state when the folder changes
  useEffect(() => {
    selectedMediaStore.addMultipleMediaIds([]);
  }, [folderId]);

  return (
    <div className="items-center flex gap-2">
      <Checkbox
        onCheckedChange={onCheckboxChange}
        checked={getCheckboxState()}
        disabled={getDisabledState()}
      />
      <span className="text-[#878C91]">{children}</span>
    </div>
  );
};
