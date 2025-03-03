import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReleaseForm from "./release_form";
import type { TApiError } from "~/types/errors";
import type { TRelease, TReleaseViewProps } from "~/types/releases";
import type { TReleaseWithTracks } from "~/types/api_results";

export default function ReleaseView({ releaseId }: TReleaseViewProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const { data, error, isError, isLoading } = useQuery({
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
    queryKey: ["data"],
  });

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
        <div className="flex justify-between items-center gap-8">
          <p>{data.release?.name}</p>
          <img src={data.release?.imageUrl} height="100px" width="100px" />
          {data.tracks?.map((t) => <p>{t.name}</p>)}
        </div>
      ) : undefined}
    </div>
  );
}
