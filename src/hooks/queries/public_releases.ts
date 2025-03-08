import { queryOptions } from "@tanstack/react-query";
import type { TRelease } from "~/types/releases";

export function createPublicReleaseQueryOptions() {
  return queryOptions({
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
}
