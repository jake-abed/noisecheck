import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { TRelease } from "~/types/releases";
import type { TApiError } from "~/types/errors";

export const Route = createFileRoute("/releases/$releaseId/view")({
  component: RouteComponent,
});

function RouteComponent() {
  const { releaseId } = useParams({ strict: false });
  const { data, isLoading } = useQuery({
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
        return body;
      }

      const body = (await res.json()) as TRelease;
      return body;
    },
    queryKey: ["data"],
  });

  if (data && "error" in data) {
    return (
      <div>
        <p>Uh oh! Something went wrong!</p>
        <p>{data.error}</p>
      </div>
    );
  }

  return (
    <div>
      {isLoading ? "loading" : `/releases/${data?.id}/view`}
      {data ? (
        <img src={data.image_url} height="100px" width="100px" />
      ) : undefined}
    </div>
  );
}
