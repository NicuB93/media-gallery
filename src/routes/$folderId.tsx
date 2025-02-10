import { MediaGrid } from "@/components/media-grid/media-grid";
import { useFilterTypes } from "@/hooks/use-filter-types";
import { getFilteredData } from "@/lib/utils/url-query-data-filter";
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

  const onTitleUpdate = (id: number, title: string) => {
    mediaStore.renameChild(Number(folderId), id, title);
  };

  const folder = mediaStore.getFolder(Number(folderId));

  const folderWithFilteredChildren = getFilteredData(folder?.children, {
    search_query,
    types: searchTypes,
  });

  return (
    <MediaGrid
      mediaItems={folderWithFilteredChildren || []}
      onTitleUpdate={onTitleUpdate}
    />
  );
}
