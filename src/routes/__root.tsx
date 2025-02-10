import { SidebarProvider } from "@/components/ui/sidebar";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { AppSidebar } from "@/components/app-sidebar";
import { Layout } from "@/components/layout";
import { useMediaStore } from "@/stores/media-store";

export const Route = createRootRoute({
  component: () => {
    return <RootComponent />;
  },
});

function RootComponent() {
  // Dng delay and tolerance
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );
  const mediaStore = useMediaStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && typeof over.id === "string" && over.id.startsWith("folder-")) {
      const targetFolderId = Number(over.id.split("-")[1]);
      const mediaId = Number(active.id);

      mediaStore.moveMediaToFolder(mediaId, targetFolderId);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={pointerWithin}
    >
      <SidebarProvider>
        <AppSidebar />
        <Layout>
          <div className="overflow-y-auto h-full">
            <Outlet />
            <TanStackRouterDevtools />
          </div>
        </Layout>
      </SidebarProvider>
    </DndContext>
  );
}
