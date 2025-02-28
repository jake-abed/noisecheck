import { useQuery } from "@tanstack/react-query";
import type { TApiError } from "~/types/errors";
import type { TRelease, TReleaseViewProps } from "~/types/releases";

export default function ReleaseView({ releaseId }: TReleaseViewProps) {
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
      {!isLoading && data ? (
        <img src={data.image_url} height="100px" width="100px" />
      ) : undefined}
    </div>
  );
}
