import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import AddTrack from "~/components/add_track";
import ReleaseView from "~/components/release_view";
import type { TRelease } from "~/types/releases";
import type { TApiError } from "~/types/errors";

export const Route = createFileRoute("/releases/$releaseId/view")({
  component: RouteComponent,
});

function RouteComponent() {
  const { releaseId } = useParams({ strict: false });

  return (
    <div>
      {releaseId ? (
        <div>
          <ReleaseView releaseId={releaseId} />
          <p>More Track</p>
          <AddTrack releaseId={Number(releaseId)} />
        </div>
      ) : undefined}
    </div>
  );
}
