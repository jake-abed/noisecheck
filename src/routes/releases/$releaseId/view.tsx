import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import ReleaseView from "~/components/release_view";
import type { TRelease } from "~/types/releases";
import type { TApiError } from "~/types/errors";

export const Route = createFileRoute("/releases/$releaseId/view")({
  component: RouteComponent,
});

function RouteComponent() {
  const { releaseId } = useParams({ strict: false });

  return (
    <div>{releaseId ? <ReleaseView releaseId={releaseId} /> : undefined}</div>
  );
}
