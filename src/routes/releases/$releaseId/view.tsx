import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AddTrack from "~/components/add_track";
import ReleaseView from "~/components/release_view";
import type { TRelease } from "~/types/releases";
import type { TApiError } from "~/types/errors";

export const Route = createFileRoute("/releases/$releaseId/view")({
  component: RouteComponent,
});

function RouteComponent() {
  const { releaseId } = useParams({ strict: false });
  const queryClient = useQueryClient();

  // Function to refresh the release data
  const refreshReleaseData = async () => {
    // Invalidate any queries related to this release
    await queryClient.invalidateQueries({
      queryKey: ["release", releaseId],
    });
    // If you have a separate query for tracks
    await queryClient.invalidateQueries({
      queryKey: ["tracks", releaseId],
    });
  };

  return (
    <div>
      {releaseId ? (
        <div className="flex flex-col gap-4">
          <ReleaseView releaseId={releaseId} />

          <AddTrack
            releaseId={Number(releaseId)}
            onTrackAdded={refreshReleaseData}
          />
        </div>
      ) : undefined}
    </div>
  );
}
