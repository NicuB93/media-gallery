import { MediaGrid } from "@/components/media-grid/media-grid";
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

  const allFilteredFiles = mediaStore.folders
    .flatMap((folder) => folder.children || [])
    .filter((item) =>
      search_query
        ? item.title.toLowerCase().includes(search_query.toLowerCase())
        : true
    );

  return <MediaGrid disabledSelection mediaItems={allFilteredFiles || []} />;
}
