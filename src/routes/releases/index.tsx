import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import type { TRelease } from "~/types/releases";

export const Route = createFileRoute("/releases/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useUser();

  const {
    data: releases = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["publicReleases"],
    queryFn: async () => {
      const response = await fetch(
        "https://happy-heartily-kid.ngrok-free.app/api/releases",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch releases");
      }

      const data = (await response.json()).data as TRelease[];
      console.log(data);
      return data;
    },
  });

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

        {isLoading && <p>Loading releases...</p>}
        {error && (
          <p className="text-red-500">
            {(error as Error).message ||
              "Error loading releases. Please try again later."}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {releases
            .filter((release: TRelease) => release.isPublic)
            .map((release: TRelease) => (
              <Link
                key={release.id}
                to="/releases/$releaseId/view"
                params={{ releaseId: String(release.id) }}
                className="block"
              >
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold">{release.name}</h3>
                  {release.imageUrl && (
                    <img
                      src={release.imageUrl}
                      alt={`Cover for ${release.name}`}
                      className="w-full h-48 object-cover mt-2 rounded"
                    />
                  )}
                  <p className="mt-2 text-gray-600">
                    {release.createdAt &&
                      new Date(release.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}

          {!isLoading &&
            releases.filter((release: TRelease) => release.isPublic).length ===
              0 && <p>No public releases available.</p>}
        </div>
      </div>
      <Outlet />
    </>
  );
}
