import Folder from "@/assets/icons/folder.svg";
import GIF from "@/assets/icons/gif.svg";
import Media from "@/assets/icons/media.svg";
import Video from "@/assets/icons/play.svg";

import { DataSidebarProps, MediaTypes } from "./types";

export const FOLDER_SECTION: DataSidebarProps[] = [
  {
    title: "Folder 1",
    id: 1,
    icon: Folder,
    type: MediaTypes.FOLDER,
    children: [
      {
        title: "mock image",
        url: "https://picsum.photos/300/200",
        id: 6,
        type: MediaTypes.IMAGES,
      },
      {
        title: "mock image",
        url: "https://picsum.photos/300/202",
        id: 7,
        type: MediaTypes.IMAGES,
      },
      {
        title: "mock video",
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        id: 8,
        type: MediaTypes.VIDEOS,
      },
      {
        title: "mock gif",
        url: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTQybHc1cXF3ZzM1Yjg2NXJmcnV3NXd1a3UzaXdjcG1mM21oa2I0NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pqMSyHmekA1Qe7Utp7/giphy.gif",
        id: 9,
        type: MediaTypes.GIFS,
      },
    ],
  },
  {
    title: "Folder 2",
    id: 10,
    icon: Folder,
    type: MediaTypes.FOLDER,
    children: [
      {
        title: "mock image",
        url: "https://picsum.photos/300/204",
        id: 6,
        type: MediaTypes.IMAGES,
      },
      {
        title: "mock image",
        url: "https://picsum.photos/300/207",
        id: 7,
        type: MediaTypes.IMAGES,
      },
      {
        title: "mock video",
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        id: 8,
        type: MediaTypes.VIDEOS,
      },
      {
        title: "mock gif",
        url: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTQybHc1cXF3ZzM1Yjg2NXJmcnV3NXd1a3UzaXdjcG1mM21oa2I0NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pqMSyHmekA1Qe7Utp7/giphy.gif",
        id: 9,
        type: MediaTypes.GIFS,
      },
    ],
  },
  {
    title: "New folder",
    type: MediaTypes.FOLDER,
    id: 2,
    icon: Folder,
  },
];

export const FILTER_SECTION: DataSidebarProps[] = [
  {
    title: "Images",
    id: 3,
    type: MediaTypes.IMAGES,
    icon: Media,
    isFilter: true,
    children: [],
  },
  {
    title: "Videos",
    id: 4,
    type: MediaTypes.VIDEOS,
    icon: Video,
    isFilter: true,
    children: [],
  },
  {
    title: "GIFs",
    id: 5,
    type: MediaTypes.GIFS,
    icon: GIF,
    isFilter: true,
    children: [],
  },
];
