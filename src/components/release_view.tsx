import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TrackForm from "./track_form";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "@tanstack/react-router";
import type { TApiError } from "~/types/errors";
import type { TReleaseViewProps } from "~/types/releases";
import type { TReleaseWithTracks } from "~/types/api_results";
import type { TTrack } from "~/types/tracks";

export default function ReleaseView({ releaseId }: TReleaseViewProps) {
  const [editingTrackId, setEditingTrackId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { getToken } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();
  const navigate = useNavigate();

  const { data, error, isError, isLoading, refetch } = useQuery({
    queryFn: async () => {
      const res = await fetch(
        "https://happy-heartily-kid.ngrok-free.app/api/releases/" + releaseId,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        },
      );

      if (res.status != 200) {
        const body = (await res.json()) as TApiError;
        throw new Error(body.error);
      }

      const body = (await res.json()) as TReleaseWithTracks;
      return body;
    },
    queryKey: ["release", releaseId],
  });

  // Check if the current user is the owner of this release
  const isOwner = isUserLoaded && user && data?.release?.userId === user.id;

  const handleEditTrack = (trackId: number) => {
    setEditingTrackId(trackId);
  };

  const handleCancelEdit = () => {
    setEditingTrackId(null);
  };

  const handleDeleteRelease = async () => {
    if (!isOwner || !data?.release?.id) return;

    try {
      setIsDeleting(true);
      const token = await getToken();

      const res = await fetch(
        `https://happy-heartily-kid.ngrok-free.app/api/releases/${data.release.id}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (res.ok) {
        // Navigate back to user's releases page after successful deletion
        navigate({ to: "/user/releases" });
      } else {
        throw new Error("Failed to delete release");
      }
    } catch (error) {
      console.error("Error deleting release:", error);
      alert("Failed to delete release. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditRelease = () => {
    if (!isOwner || !data?.release?.id) return;
    navigate({
      to: "/releases/$releaseId/view",
      params: { releaseId: releaseId },
    });
  };

  const updateTrack = (track: TTrack) => {
    return async function (value: any) {
      const token = await getToken();

      const basicInfo = {
        name: value.name,
        releaseId: Number(releaseId),
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(basicInfo));
      if (value.file) {
        formData.append("file", value.file);
      }

      const res = await fetch(
        `https://happy-heartily-kid.ngrok-free.app/api/tracks/${track.id}`,
        {
          method: "PUT",
          mode: "cors",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        },
      );

      if (res.ok) {
        // Reset editing state
        setEditingTrackId(null);
        // Refresh the data
        await refetch();
      } else {
        throw new Error("Couldn't update the track!");
      }
    };
  };

  if (isError) {
    return (
      <div>
        <p>Uh oh! Something went wrong!</p>
        <p>
          {error.name}: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex justify-center items-">
      {isLoading ? "loading" : undefined}
      {!isLoading && data ? (
        <div className="flex flex-col p-4 bg-zinc-800 rounded-lg shadow-lg max-w-96">
          <div className="flex justify-between items-start gap-8 mb-4">
            <div>
              <h2 className="text-xl font-bold">{data.release?.name}</h2>
              <p className="text-zinc-400">
                Released{" "}
                {new Date(data.release?.createdAt || "").toLocaleDateString()}
              </p>
              {data.release?.isPublic ? (
                <span className="text-sm text-emerald-500">Public</span>
              ) : (
                <span className="text-sm text-amber-500">Private</span>
              )}
            </div>
            <img
              src={data.release?.imageUrl}
              height="100"
              width="100"
              alt={data.release?.name}
              className="rounded-lg"
            />
          </div>

          {/* Owner-specific controls */}
          {isOwner && (
            <div className="flex gap-2 mt-2 mb-4">
              <button
                onClick={handleEditRelease}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
              >
                Edit Release
              </button>
              <button
                onClick={handleDeleteRelease}
                disabled={isDeleting}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
              >
                {isDeleting ? "Deleting..." : "Delete Release"}
              </button>
            </div>
          )}

          <div className="border-t border-zinc-700 pt-4">
            <h3 className="text-lg font-semibold mb-2">Tracks</h3>
            <div className="flex flex-col gap-2">
              {data.tracks?.map((track) => (
                <div key={track.id}>
                  {editingTrackId === track.id ? (
                    <div className="bg-zinc-700 p-3 rounded-lg">
                      <TrackForm
                        name={track.name}
                        releaseId={Number(releaseId)}
                        submitFn={() => updateTrack(track)}
                        action="update"
                      />
                      <button
                        onClick={handleCancelEdit}
                        className="mt-2 px-3 py-1 bg-zinc-600 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div>
                        <p>{track.name}</p>
                        <p className="text-zinc-400">
                          {Math.floor(track.length / 60)}:
                          {String(track.length % 60).padStart(2, "0")}
                        </p>
                      </div>
                      {/* Only show edit button if user is the owner */}
                      {isOwner && (
                        <button
                          onClick={() => handleEditTrack(track.id)}
                          className="px-3 py-1 bg-zinc-700 rounded text-sm"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : undefined}
    </div>
  );
}
