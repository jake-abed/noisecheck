import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import AddTrack from "~/components/add_track";
import ReleaseView from "~/components/release_view";

export const Route = createFileRoute("/releases/$releaseId/view")({
  component: RouteComponent,
});

function RouteComponent() {
  const { releaseId } = useParams({ strict: false });

  return (
    <div>
      {releaseId ? (
        <div className="flex flex-col gap-4">
          <ReleaseView releaseId={releaseId} />
        </div>
      ) : undefined}
    </div>
  );
}
