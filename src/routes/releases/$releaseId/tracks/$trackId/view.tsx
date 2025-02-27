import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { TApiError } from "~/types/errors";
import { TTrack } from "~/types/tracks";

export const Route = createFileRoute(
  "/releases/$releaseId/tracks/$trackId/view",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { trackId } = useParams({ strict: false });
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await fetch(
        "https://happy-heartily-kid.ngrok-free.app/api/tracks/" + trackId,
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
        return body;
      }

      const body = (await res.json()) as TTrack;
      return body;
    },
  });
  return <div>Hello "/releases/$releaseId/tracks/$trackId/view"!</div>;
}
