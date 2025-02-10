import { MediaProps } from "../../mock/types";

export type MediaGridProps = {
  mediaItems: MediaProps[];
  onTitleUpdate?: (id: number, newTitle: string) => void;
  disabledSelection?: boolean;
};
