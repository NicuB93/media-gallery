import { FOLDER_SECTION } from "@/components/app-sidebar/mock-data";
import { MediaTypes } from "@/components/app-sidebar/types";
import { MediaGrid } from "@/components/media-grid/media-grid";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/$folderId")({
  component: FolderPage,
});

function FolderPage() {
  const { folderId } = useParams({ strict: false });
  const folderFiles = FOLDER_SECTION.filter(
    (item) => item.type === MediaTypes.FOLDER
  );

  const folder = folderFiles.find((item) => item.id === Number(folderId));
  console.log(folder);

  return (
    <MediaGrid folderId={folder?.id} mediaItems={folder?.children || []} />
  );
}
