import { SidebarProvider } from "@/components/ui/sidebar";
import { DndContext } from "@dnd-kit/core";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { AppSidebar } from "@/components/app-sidebar";
import { Layout } from "@/components/layout";

export const Route = createRootRoute({
  component: () => (
    <DndContext>
      <SidebarProvider>
        <AppSidebar />
        <Layout>
          <Outlet />
          <TanStackRouterDevtools />
        </Layout>
      </SidebarProvider>
    </DndContext>
  ),
});
