export enum MediaTypes {
  IMAGES = "Images",
  VIDEOS = "Videos",
  GIFS = "GIFs",
  FOLDER = "Folder",
}

export type DataSidebarProps =
  | {
      title: string;
      id: number;
      type: MediaTypes.FOLDER;
      icon: string;
      isFilter?: false;
      children?: DataSidebarProps[];
    }
  | {
      title: string;
      id: number;
      type?: Exclude<MediaTypes, MediaTypes.FOLDER>;
      icon?: string;
      isFilter?: false;
      url: string;
    }
  | {
      title: string;
      id: number;
      type?: Exclude<MediaTypes, MediaTypes.FOLDER>;
      icon: string;
      isFilter: true;
      children: DataSidebarProps[];
    };
