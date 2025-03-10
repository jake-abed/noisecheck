import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { createPublicReleaseQueryOptions } from "~/hooks/queries/public_releases";
import { useQuery } from "@tanstack/react-query";
import type { TRelease } from "~/types/releases";
import { Release } from "~/components/release";
import { Skeleton } from "~/components/ui/skeleton";

export const Route = createFileRoute("/releases/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useUser();

  const { data, isLoading, error } = useQuery(
    createPublicReleaseQueryOptions(),
  );

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <SignedIn>
          <div>Hi {user?.username}!</div>
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <h2 className="text-2xl font-bold mb-4">Public Releases</h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            <div className="flex justify-center items-center gap-8">
              <Skeleton className="min-w-[100px] w-[100px] h-[100px] rounded" />
              <div className="flex flex-col items-center justify-center gap-4 w-full">
                <Skeleton className="w-full h-8 rounded" />
                <Skeleton className="w-full h-8 rounded" />
              </div>
            </div>
            <div className="flex justify-center items-center gap-8">
              <Skeleton className="min-w-[100px] w-[100px] h-[100px] rounded" />
              <div className="flex flex-col items-center justify-center gap-4 w-full">
                <Skeleton className="w-full h-8 rounded" />
                <Skeleton className="w-full h-8 rounded" />
              </div>
            </div>
            <div className="flex justify-center items-center gap-8">
              <Skeleton className="min-w-[100px] w-[100px] h-[100px] rounded" />
              <div className="flex flex-col items-center justify-center gap-4 w-full">
                <Skeleton className="w-full h-8 rounded" />
                <Skeleton className="w-full h-8 rounded" />
              </div>
            </div>
            <div className="flex justify-center items-center gap-8">
              <Skeleton className="min-w-[100px] w-[100px] h-[100px] rounded" />
              <div className="flex flex-col items-center justify-center gap-4 w-full">
                <Skeleton className="w-full h-8 rounded" />
                <Skeleton className="w-full h-8 rounded" />
              </div>
            </div>
            <div className="flex justify-center items-center gap-8">
              <Skeleton className="min-w-[100px] w-[100px] h-[100px] rounded" />
              <div className="flex flex-col items-center justify-center gap-4 w-full">
                <Skeleton className="w-full h-8 rounded" />
                <Skeleton className="w-full h-8 rounded" />
              </div>
            </div>
            <div className="flex justify-center items-center gap-8">
              <Skeleton className="min-w-[100px] w-[100px] h-[100px] rounded" />
              <div className="flex flex-col items-center justify-center gap-4 w-full">
                <Skeleton className="w-full h-8 rounded" />
                <Skeleton className="w-full h-8 rounded" />
              </div>
            </div>
          </div>
        ) : undefined}

        {error && (
          <p className="text-red-500">
            {(error as Error).message ||
              "Error loading releases. Please try again later."}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {data?.map((release: TRelease) => <Release {...release} />)}

          {!isLoading &&
            data?.filter((release: TRelease) => release.isPublic).length ===
              0 && <p>No public releases available.</p>}
        </div>
      </div>
      <Outlet />
    </>
  );
}
