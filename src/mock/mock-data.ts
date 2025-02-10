import GIF from "@/assets/icons/gif.svg";
import Media from "@/assets/icons/media.svg";
import Video from "@/assets/icons/play.svg";

import { FilterProps, FolderProps, MediaTypes } from "./types";

export const FOLDER_SECTION: FolderProps[] = [
  {
    title: "Folder 1",
    id: 1,
    type: MediaTypes.FOLDER,
    children: [
      {
        title: "Serene Mountainscape",
        url: "https://logos-world.net/wp-content/uploads/2022/05/Google-Photos-Logo.png",
        id: 101,
        type: MediaTypes.IMAGES,
      },
      {
        title: "Sunlit Forest Path",
        url: "https://picsum.photos/id/37/300/202",
        id: 102,
        type: MediaTypes.IMAGES,
      },
      {
        title: "Ocean Horizon at Dusk",
        url: "https://picsum.photos/id/38/300/250",
        id: 103,
        type: MediaTypes.IMAGES,
      },
      {
        title: "City Lights From Above",
        url: "https://picsum.photos/id/39/300/280",
        id: 104,
        type: MediaTypes.IMAGES,
      },
      {
        title: "Golden Hour Reflections",
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        id: 105,
        type: MediaTypes.VIDEOS,
      },
      {
        title: "Dev struggle folder 1",
        url: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTQybHc1cXF3ZzM1Yjg2NXJmcnV3NXd1a3UzaXdjcG1mM21oa2I0NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pqMSyHmekA1Qe7Utp7/giphy.gif",
        id: 106,
        type: MediaTypes.GIFS,
      },
    ],
  },
  {
    title: "Folder 2",
    id: 2,
    type: MediaTypes.FOLDER,
    children: [
      {
        title: "Quiet Countryside Morning",
        url: "https://picsum.photos/id/4/300/200",
        id: 107,
        type: MediaTypes.IMAGES,
      },
      {
        title: "Colorful Festival Scene",
        url: "https://picsum.photos/id/10/300/207",
        id: 108,
        type: MediaTypes.IMAGES,
      },
      {
        title: "Winding Coastal Road",
        url: "https://picsum.photos/id/24/300/209",
        id: 109,
        type: MediaTypes.IMAGES,
      },
      {
        title: "BigBuckBunny",
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        id: 110,
        type: MediaTypes.VIDEOS,
      },
      {
        title: "dev struggle folder 2",
        url: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTQybHc1cXF3ZzM1Yjg2NXJmcnV3NXd1a3UzaXdjcG1mM21oa2I0NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pqMSyHmekA1Qe7Utp7/giphy.gif",
        id: 111,
        type: MediaTypes.GIFS,
      },
    ],
  },
];

export const FILTER_SECTION: FilterProps[] = [
  {
    title: "Images",
    id: 201,
    type: MediaTypes.IMAGES,
    icon: Media,
    isFilter: true,
    children: [],
  },
  {
    title: "Videos",
    id: 202,
    type: MediaTypes.VIDEOS,
    icon: Video,
    isFilter: true,
    children: [],
  },
  {
    title: "GIFs",
    id: 203,
    type: MediaTypes.GIFS,
    icon: GIF,
    isFilter: true,
    children: [],
  },
];
