import { queryOptions } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import type { TRelease } from "~/types/releases";

export function createUserReleasesQueryOptions() {
  const { getToken, userId } = useAuth();
  return queryOptions({
    queryFn: async () => {
      const token = await getToken();
      const url = `/api/users/${userId}/releases`;
      const res = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (res.status != 200) {
        return undefined;
      } else {
        return (await res.json()) as { data: Array<TRelease> };
      }
    },
    queryKey: ["userReleases", userId],
  });
}
