import { MediaGrid } from "@/components/media-grid/media-grid";
import { useFilterTypes } from "@/hooks/use-filter-types";
import { getFilteredData } from "@/lib/utils/url-query-data-filter";
import { useMediaStore } from "@/stores/media-store";
import { createFileRoute, useSearch } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const mediaStore = useMediaStore();
  const { search_query }: { search_query: string } = useSearch({
    strict: false,
  });
  const searchTypes = useFilterTypes();

  const allFiles = mediaStore.getAllFiles();

  const allFilesFiltered = getFilteredData(allFiles, {
    search_query,
    types: searchTypes,
  });

  return <MediaGrid disabledSelection mediaItems={allFilesFiltered || []} />;
}
