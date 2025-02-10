export enum MediaTypes {
  IMAGES = "Images",
  VIDEOS = "Videos",
  GIFS = "GIFs",
  FOLDER = "Folder",
}

export type MediaProps = {
  title: string;
  id: number;
  type: Exclude<MediaTypes, MediaTypes.FOLDER>;
  icon?: string;
  url: string;
};

export type FolderProps = {
  title: string;
  id: number;
  type: MediaTypes.FOLDER;
  children?: MediaProps[];
};

export type FilterProps = {
  title: string;
  id: number;
  type: Exclude<MediaTypes, MediaTypes.FOLDER>;
  icon: string;
  isFilter: true;
  children: MediaProps[];
};
