import { CheckedState } from "@radix-ui/react-checkbox";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";

import { Autocomplete } from "@/components/ui/autocomplete";
import { Checkbox } from "@/components/ui/checkbox";
import { useDebounceValue } from "@/hooks/use-debounce";
import { useMediaStore } from "@/stores/media-store";

/**
 * SearchInput component provides a search input field with autocomplete functionality.
 * It allows users to search for media files within a specific folder or across all files.
 *
 * @component
 *
 * @example
 * <SearchInput />
 *
 * @returns {JSX.Element} The rendered SearchInput component.
 *
 * @remarks
 * This component uses the `Autocomplete` and `Checkbox` components from the UI library.
 * It also utilizes custom hooks like `useDebounceValue` and `useMediaStore`.
 *
 * @hook
 * - `useState` to manage component state.
 * - `useDebounceValue` to debounce the search input value.
 * - `useNavigate` to navigate to different routes.
 * - `useParams` to get the current folder ID from the URL.
 * - `useCallback` and `useMemo` for memoizing functions and values.
 *
 * @function getOptions
 * Retrieves the list of media files based on the current folder ID and the `checkedAllFiles` state.
 *
 * @function submit
 * Navigates to the appropriate route based on the search query and folder ID.
 *
 * @function handleSelectItem
 * Handles the selection of an item from the autocomplete dropdown.
 *
 * @function handleShowAll
 * Handles the action to show all search results.
 *
 * @function onCheckedChange
 * Handles the change event for the `Checkbox` component.
 *
 * @function handleEnter
 * Handles the enter key press event to submit the search query.
 *
 * @param {boolean} checkedAllFiles - State to determine if the search should include all files.
 * @param {string} value - The current value of the search input.
 * @param {boolean} open - State to control the visibility of the autocomplete dropdown.
 * @param {string} folderId - The current folder ID from the URL parameters.
 * @param {Array} options - The list of media files to display in the autocomplete dropdown.
 * @param {Array} filteredOptions - The filtered list of media files based on the search query.
 * @param {Array} displayedOptions - The list of media files to display in the autocomplete dropdown (limited to 4 items).
 * @param {boolean} hasMore - State to determine if there are more search results beyond the displayed options.
 */
export const SearchInput = () => {
  const [checkedAllFiles, setCheckedAllFiles] = useState<CheckedState>(false);
  const [value, setValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const [debouncedValue] = useDebounceValue(value, 300);
  const mediaStore = useMediaStore();
  const navigate = useNavigate();

  const { folderId } = useParams({ strict: false });

  const getOptions = useCallback(() => {
    if (!folderId || (folderId && checkedAllFiles)) {
      const allFiles = (mediaStore.getAllFiles() || []).map((media) => ({
        id: media?.id,
        name: media?.title,
      }));

      return allFiles;
    }

    const children =
      mediaStore.getFolder(Number(folderId))?.children?.map((media) => ({
        id: media?.id,
        name: media?.title,
      })) || [];

    return children;
  }, [folderId, checkedAllFiles, mediaStore]);

  const options = getOptions();

  const filteredOptions = useMemo(() => {
    const query = debouncedValue.trim().toLowerCase();
    if (!query) return [];
    return options.filter((item) => item.name?.toLowerCase().includes(query));
  }, [options, debouncedValue]);

  const submit = useCallback(
    (query: string) => {
      if (!query) return;

      if (checkedAllFiles || !folderId) {
        navigate({
          to: "/",
          search: { search_query: query },
        });
        return;
      } else {
        navigate({
          to: `/${folderId}`,
          search: { search_query: query },
        });
      }
    },
    [navigate, folderId, checkedAllFiles]
  );

  const displayedOptions = filteredOptions.slice(0, 4);
  const hasMore = filteredOptions.length > 4;

  function handleSelectItem(item: string | undefined) {
    if (item) {
      submit(item);
      setValue(item);
      setOpen(false); // close the dropdown
    }
  }

  function handleShowAll() {
    // e.g. show all or navigate
    submit(value);
    setOpen(false); // close the dropdown
  }

  const onCheckedChange = (checked: boolean) => {
    setCheckedAllFiles(checked);
  };

  function handleEnter(query: string) {
    submit(query);
    setOpen(false);
  }

  return (
    <div className="flex gap-4">
      <Autocomplete
        value={value}
        onChange={(nextValue) => {
          setValue(nextValue);
          setOpen(nextValue.trim().length > 0);
        }}
        open={open}
        onOpenChange={setOpen}
        items={displayedOptions}
        onSelectItem={handleSelectItem}
        onShowAll={handleShowAll}
        hasMore={hasMore}
        onEnter={handleEnter}
        placeholder="Type to search..."
      />
      {folderId && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Search all files</span>
          <Checkbox
            onCheckedChange={onCheckedChange}
            checked={checkedAllFiles}
          />
        </div>
      )}
    </div>
  );
};
