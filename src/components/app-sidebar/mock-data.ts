import Folder from "@/assets/icons/folder.svg";
import GIF from "@/assets/icons/gif.svg";
import Media from "@/assets/icons/media.svg";
import Video from "@/assets/icons/play.svg";

import { DataSidebarProps } from "./types";

export const FOLDER_SECTION: DataSidebarProps[] = [
  {
    title: "Your folder",
    url: "#",
    icon: Folder,
  },
  {
    title: "New folder",
    url: "#",
    icon: Folder,
  },
];

export const FILTER_SECTION: DataSidebarProps[] = [
  {
    title: "Images",
    url: "#",
    icon: Media,
  },
  {
    title: "Videos",
    url: "#",
    icon: Video,
  },
  {
    title: "GIFs",
    url: "#",
    icon: GIF,
  },
];
