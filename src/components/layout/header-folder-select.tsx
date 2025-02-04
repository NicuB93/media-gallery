import Folder from "@/assets/icons/folder.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const HeaderSelect = () => {
  const placeholder = (
    <span className="flex items-center gap-2">
      <Folder />
      Your folder
    </span>
  );

  return (
    <Select>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
        <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
        <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
        <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
        <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
      </SelectContent>
    </Select>
  );
};
