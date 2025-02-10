import { Checkbox } from "@/components/ui/checkbox";
import { useMediaStore } from "@/stores/media-store";
import { useSelectedMedia } from "@/stores/selected-media-store";
import { useParams } from "@tanstack/react-router";
import { ReactNode, useEffect } from "react";

/**
 * HeaderCheckbox component renders a checkbox that manages the selection state of media items within a folder.
 * It uses the `useParams` hook to get the current folder ID, and interacts with `useMediaStore` and `useSelectedMedia` stores
 * to manage the media selection state.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} [props.children] - Optional children to be rendered next to the checkbox.
 *
 * @returns {JSX.Element} The rendered HeaderCheckbox component.
 *
 * @example
 * <HeaderCheckbox>
 *   Select All
 * </HeaderCheckbox>
 *
 * @remarks
 * The checkbox state is determined based on the selected media IDs and the media items within the current folder.
 * It can be in one of three states: unchecked, checked, or indeterminate.
 * The checkbox is disabled if there are no media items in the folder.
 *
 * The `useEffect` hook is used to reset the selected media IDs whenever the folder ID changes.
 */
export const HeaderCheckbox = ({ children }: { children?: ReactNode }) => {
  const { folderId } = useParams({ strict: false });
  const selectedMediaStore = useSelectedMedia();
  const mediaStore = useMediaStore();
  const selectedIds = selectedMediaStore.selected;

  const folder = mediaStore.getFolder(Number(folderId));

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
