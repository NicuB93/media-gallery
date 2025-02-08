import { CheckedState } from "@radix-ui/react-checkbox";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";

import { Autocomplete } from "@/components/ui/autocomplete";
import { Checkbox } from "@/components/ui/checkbox";
import { useDebounceValue } from "@/hooks/use-debounce";
import { useMediaStore } from "@/stores/media-store";

export const SearchInput = () => {
  const [checked, setChecked] = useState<CheckedState>(false);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const [debouncedValue] = useDebounceValue(value, 300);
  const mediaStore = useMediaStore();
  const navigate = useNavigate();

  const { folderId } = useParams({ strict: false });

  const getOptions = useCallback(() => {
    if (!folderId) {
      return mediaStore.folders
        .flatMap((folder) => folder.children)
        .map((media) => ({
          id: media?.id,
          name: media?.title,
        }));
    }

    if (folderId && checked) {
      return mediaStore.folders
        .flatMap((folder) => folder.children)
        .map((media) => ({
          id: media?.id,
          name: media?.title,
        }));
    }

    const children = mediaStore.folders
      .find((f) => f.id === Number(folderId))
      ?.children?.map((media) => ({
        id: media?.id,
        name: media?.title,
      }));

    return children || [];
  }, [folderId, checked]);

  const options = getOptions();

  const filteredOptions = useMemo(() => {
    const query = debouncedValue.trim().toLowerCase();
    if (!query) return [];
    return options.filter((item) => item.name?.toLowerCase().includes(query));
  }, [options, debouncedValue]);

  const submit = useCallback(
    (query: string) => {
      if (!query) return;

      if (checked) {
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
    [navigate, folderId, checked]
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
    setChecked(checked);
  };

  function handleEnter(query: string) {
    submit(query);
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
          <Checkbox onCheckedChange={onCheckedChange} checked={checked} />
        </div>
      )}
    </div>
  );
};
