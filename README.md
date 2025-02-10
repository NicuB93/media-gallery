# Media Gallery App with React + Vite + TypeScript Application

## Tech Stack

This project is powered by:

- **React** – The core library for building interactive UIs.
- **Shadcn + Tailwind CSS** – For consistent, modern styling and rapid UI development.
- **Tanstack Router** – Managing dynamic routing with ease.
- **Zustand** – Simplifying global state management.
- **TypeScript** – Enhancing code quality and maintainability.
- **Vite** – Offering a lightning-fast development environment and build process.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** v20.12.2 or higher
- **Bun JS Runtime** – A fast JavaScript runtime. You can install Bun [here](https://bun.sh/docs/installation).

### Installation & Development

1. **Install Dependencies**

   Open your terminal in the project directory and run:

   ```bash
   bun install
   ```

2. **Launch the Development Server**

   Start your application in development mode with:

   ```bash
   bun run dev
   ```

3. **Build the Application**

   When you're ready to build the project for production, execute:

   ```bash
   bun run build
   ```

4. **Run the Production Server**

   Preview the production build locally by running:

   ```bash
   bun run preview --host
   ```

   Then, open the provided network URL in your browser.

## Architecture Overview

Our project is structured to promote clarity and scalability:

- **`src/`**: Contains the core React application.
- **`store/`**: Houses global state management with Zustand.
- **`components/ui/`**: Includes independent and compound UI components (some generated via Shadcn).
- **`components/`**: Encompasses composite components like layout elements and the sidebar.
- **`assets/`**: Stores images, icons, and other media assets.
- **`routes/`**: Defines application routes using Tanstack Router.
- **`hooks/`**: Contains custom React hooks to streamline our code.

### Component Pattern

I followed the **Container Component → Presentational Component** pattern:

- **Container Components**: Responsible for data fetching (via Zustand for now) and state management.
- **Presentational Components**: Focused on rendering the UI with the provided data.

### Routing Details

Routing is handled by Tanstack Router, with routes defined in the `routes` folder. For example:

- **Default View (`/`):**

  ```
  ./src/main.tsx -> ./src/routes/__root.tsx -> ./src/routes/index.tsx
  ```

- **Folder-Specific View (`/:folderId`):**

  ```
  ./src/main.tsx -> ./src/routes/__root.tsx -> ./src/routes/$folderId.tsx
  ```

The `__root.tsx` component renders the layout and sidebar. It is wrapped with both a Drag-and-Drop Provider and a SidebarProvider (leveraging Shadcn) that supports additional functionalities like sidebar collapsing and mobile responsiveness with minor tweaks.

## Current Limitations

While the application is fully functional, please note the following limitations:

1. **Responsiveness:** The design is currently optimized for desktop use only.
2. **Data Persistence:** There’s no backend database or API; data is stored temporarily in session storage via Zustand and is lost when the tab closes.
3. **Media Uploads:** Only supports media via direct URLs (e.g., from Picsum) that do not enforce CORS restrictions.
4. **Folder Structure:** Only a flat folder structure is supported (nested folders are not available).
5. **Drag and Drop:** Currently, drag-and-drop is available only for moving files between folders; file sorting is not supported.
6. **Folder Renaming:** Renaming folders is not supported at the moment.
7. **Security:** The application is publicly accessible without authentication.
8. **Media Viewing:** Full-screen media viewing is not available.
9. **Server-Side Rendering (SSR):** SSR is not implemented, but do we need it?

## Future Enhancements

To further enhance the application, to go to production, we could consider the following improvements:

1. Responsive design for mobile and tablet devices.
2. A backend DB/API to persist and manage data.
3. Add some optimistic UI updates.
4. Integration with external storage solutions (e.g., S3, Firebase, or MinIO).
5. Support for uploading media files.
6. Nested folder support.
7. Enhanced drag-and-drop functionality for sorting files.
8. Folder renaming capabilities.
9. Authentication and authorization mechanisms.
10. Full-screen media viewing support.
11. Server-Side Rendering (SSR) for improved SEO maybe and faster initial load times.
