import Folder from "@/assets/icons/folder.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMediaStore } from "@/stores/media-store";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const HeaderSelect = () => {
  const [selected, setSelected] = useState<string | undefined>();
  const navigate = useNavigate({ from: "/" });
  const { folderId } = useParams({ strict: false });
  const mediaStore = useMediaStore();

  const placeholder = <span>Select folder</span>;

  const folders = mediaStore.folders.map((folder) => ({
    value: `/${folder.id}`,
    label: folder.title,
  }));

  const onSelectChange = (value: string) => {
    const stringifiedValue = `/${value}`;
    setSelected(stringifiedValue);
    navigate({
      to: stringifiedValue,
    });
  };

  useEffect(() => {
    setSelected(`/${folderId}`);
  }, [folderId]);

  return (
    <Select value={selected} onValueChange={onSelectChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {folders.map((folder) => (
          <SelectItem
            className="flex gap-2"
            key={folder.value}
            value={folder.value}
          >
            <span className="flex items-center gap-2">
              <Folder />
              {folder.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
