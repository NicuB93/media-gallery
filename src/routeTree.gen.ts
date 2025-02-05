/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as FolderIdImport } from './routes/$folderId'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const FolderIdRoute = FolderIdImport.update({
  id: '/$folderId',
  path: '/$folderId',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/$folderId': {
      id: '/$folderId'
      path: '/$folderId'
      fullPath: '/$folderId'
      preLoaderRoute: typeof FolderIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/$folderId': typeof FolderIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/$folderId': typeof FolderIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/$folderId': typeof FolderIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/$folderId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/$folderId'
  id: '__root__' | '/' | '/$folderId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  FolderIdRoute: typeof FolderIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  FolderIdRoute: FolderIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/$folderId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/$folderId": {
      "filePath": "$folderId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
