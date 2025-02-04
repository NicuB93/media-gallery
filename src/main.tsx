import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import { AppSidebar } from "./components/app-sidebar";
import { Layout } from "./components/layout";
import { SidebarProvider } from "./components/ui/sidebar";
import "./index.css";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <SidebarProvider>
        <AppSidebar />
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </SidebarProvider>
    </StrictMode>
  );
}
