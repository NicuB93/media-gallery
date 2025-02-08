import { MediaGrid } from "@/components/media-grid/media-grid";
import { useFilterTypes } from "@/hooks/use-filter-types";
import { MediaTypes } from "@/mock/types";
import { useMediaStore } from "@/stores/media-store";
import { createFileRoute, useParams, useSearch } from "@tanstack/react-router";

export const Route = createFileRoute("/$folderId")({
  component: FolderPage,
});

function FolderPage() {
  const { folderId } = useParams({ strict: false });
  const mediaStore = useMediaStore();
  const searchTypes = useFilterTypes();
  const { search_query }: { search_query: string } = useSearch({
    strict: false,
  });

  const folderFiles = mediaStore.folders.filter(
    (item) => item.type === MediaTypes.FOLDER
  );

  const onTitleUpdate = (id: number, title: string) => {
    mediaStore.renameChild(Number(folderId), id, title);
  };

  const folder = folderFiles.find((item) => item.id === Number(folderId));

  const folderWithFilteredChildren = folder?.children?.filter((item) => {
    if (searchTypes.length > 0) {
      return (
        searchTypes.includes(item.type) &&
        (search_query
          ? item.title.toLowerCase().includes(search_query.toLowerCase())
          : true)
      );
    }

    return search_query
      ? item.title.toLowerCase().includes(search_query.toLowerCase())
      : true;
  });

  return (
    <MediaGrid
      mediaItems={folderWithFilteredChildren || []}
      onTitleUpdate={onTitleUpdate}
    />
  );
}
