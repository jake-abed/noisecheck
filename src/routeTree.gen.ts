/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as AboutImport } from "./routes/about";
import { Route as UserRouteImport } from "./routes/user/route";
import { Route as IndexImport } from "./routes/index";
import { Route as ReleasesIndexImport } from "./routes/releases/index";
import { Route as UserReleasesRouteImport } from "./routes/user/releases/route";
import { Route as UserProfileRouteImport } from "./routes/user/profile/route";
import { Route as UserNewReleaseRouteImport } from "./routes/user/new-release/route";
import { Route as ReleasesReleaseIdViewImport } from "./routes/releases/$releaseId/view";

// Create/Update Routes

const AboutRoute = AboutImport.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => rootRoute,
} as any);

const UserRouteRoute = UserRouteImport.update({
  id: "/user",
  path: "/user",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const ReleasesIndexRoute = ReleasesIndexImport.update({
  id: "/releases/",
  path: "/releases/",
  getParentRoute: () => rootRoute,
} as any);

const UserReleasesRouteRoute = UserReleasesRouteImport.update({
  id: "/releases",
  path: "/releases",
  getParentRoute: () => UserRouteRoute,
} as any);

const UserProfileRouteRoute = UserProfileRouteImport.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => UserRouteRoute,
} as any);

const UserNewReleaseRouteRoute = UserNewReleaseRouteImport.update({
  id: "/new-release",
  path: "/new-release",
  getParentRoute: () => UserRouteRoute,
} as any);

const ReleasesReleaseIdViewRoute = ReleasesReleaseIdViewImport.update({
  id: "/releases/$releaseId/view",
  path: "/releases/$releaseId/view",
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/user": {
      id: "/user";
      path: "/user";
      fullPath: "/user";
      preLoaderRoute: typeof UserRouteImport;
      parentRoute: typeof rootRoute;
    };
    "/about": {
      id: "/about";
      path: "/about";
      fullPath: "/about";
      preLoaderRoute: typeof AboutImport;
      parentRoute: typeof rootRoute;
    };
    "/user/new-release": {
      id: "/user/new-release";
      path: "/new-release";
      fullPath: "/user/new-release";
      preLoaderRoute: typeof UserNewReleaseRouteImport;
      parentRoute: typeof UserRouteImport;
    };
    "/user/profile": {
      id: "/user/profile";
      path: "/profile";
      fullPath: "/user/profile";
      preLoaderRoute: typeof UserProfileRouteImport;
      parentRoute: typeof UserRouteImport;
    };
    "/user/releases": {
      id: "/user/releases";
      path: "/releases";
      fullPath: "/user/releases";
      preLoaderRoute: typeof UserReleasesRouteImport;
      parentRoute: typeof UserRouteImport;
    };
    "/releases/": {
      id: "/releases/";
      path: "/releases";
      fullPath: "/releases";
      preLoaderRoute: typeof ReleasesIndexImport;
      parentRoute: typeof rootRoute;
    };
    "/releases/$releaseId/view": {
      id: "/releases/$releaseId/view";
      path: "/releases/$releaseId/view";
      fullPath: "/releases/$releaseId/view";
      preLoaderRoute: typeof ReleasesReleaseIdViewImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

interface UserRouteRouteChildren {
  UserNewReleaseRouteRoute: typeof UserNewReleaseRouteRoute;
  UserProfileRouteRoute: typeof UserProfileRouteRoute;
  UserReleasesRouteRoute: typeof UserReleasesRouteRoute;
}

const UserRouteRouteChildren: UserRouteRouteChildren = {
  UserNewReleaseRouteRoute: UserNewReleaseRouteRoute,
  UserProfileRouteRoute: UserProfileRouteRoute,
  UserReleasesRouteRoute: UserReleasesRouteRoute,
};

const UserRouteRouteWithChildren = UserRouteRoute._addFileChildren(
  UserRouteRouteChildren,
);

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "/user": typeof UserRouteRouteWithChildren;
  "/about": typeof AboutRoute;
  "/user/new-release": typeof UserNewReleaseRouteRoute;
  "/user/profile": typeof UserProfileRouteRoute;
  "/user/releases": typeof UserReleasesRouteRoute;
  "/releases": typeof ReleasesIndexRoute;
  "/releases/$releaseId/view": typeof ReleasesReleaseIdViewRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "/user": typeof UserRouteRouteWithChildren;
  "/about": typeof AboutRoute;
  "/user/new-release": typeof UserNewReleaseRouteRoute;
  "/user/profile": typeof UserProfileRouteRoute;
  "/user/releases": typeof UserReleasesRouteRoute;
  "/releases": typeof ReleasesIndexRoute;
  "/releases/$releaseId/view": typeof ReleasesReleaseIdViewRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/user": typeof UserRouteRouteWithChildren;
  "/about": typeof AboutRoute;
  "/user/new-release": typeof UserNewReleaseRouteRoute;
  "/user/profile": typeof UserProfileRouteRoute;
  "/user/releases": typeof UserReleasesRouteRoute;
  "/releases/": typeof ReleasesIndexRoute;
  "/releases/$releaseId/view": typeof ReleasesReleaseIdViewRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | "/"
    | "/user"
    | "/about"
    | "/user/new-release"
    | "/user/profile"
    | "/user/releases"
    | "/releases"
    | "/releases/$releaseId/view";
  fileRoutesByTo: FileRoutesByTo;
  to:
    | "/"
    | "/user"
    | "/about"
    | "/user/new-release"
    | "/user/profile"
    | "/user/releases"
    | "/releases"
    | "/releases/$releaseId/view";
  id:
    | "__root__"
    | "/"
    | "/user"
    | "/about"
    | "/user/new-release"
    | "/user/profile"
    | "/user/releases"
    | "/releases/"
    | "/releases/$releaseId/view";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  UserRouteRoute: typeof UserRouteRouteWithChildren;
  AboutRoute: typeof AboutRoute;
  ReleasesIndexRoute: typeof ReleasesIndexRoute;
  ReleasesReleaseIdViewRoute: typeof ReleasesReleaseIdViewRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  UserRouteRoute: UserRouteRouteWithChildren,
  AboutRoute: AboutRoute,
  ReleasesIndexRoute: ReleasesIndexRoute,
  ReleasesReleaseIdViewRoute: ReleasesReleaseIdViewRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/user",
        "/about",
        "/releases/",
        "/releases/$releaseId/view"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/user": {
      "filePath": "user/route.tsx",
      "children": [
        "/user/new-release",
        "/user/profile",
        "/user/releases"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/user/new-release": {
      "filePath": "user/new-release/route.tsx",
      "parent": "/user"
    },
    "/user/profile": {
      "filePath": "user/profile/route.tsx",
      "parent": "/user"
    },
    "/user/releases": {
      "filePath": "user/releases/route.tsx",
      "parent": "/user"
    },
    "/releases/": {
      "filePath": "releases/index.tsx"
    },
    "/releases/$releaseId/view": {
      "filePath": "releases/$releaseId/view.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
