import { AppSidebar } from "@/components/app-sidebar";
import { Layout } from "@/components/layout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <SidebarProvider>
      <AppSidebar />
      <Layout>
        <Outlet />
        <TanStackRouterDevtools />
      </Layout>
    </SidebarProvider>
  ),
});
