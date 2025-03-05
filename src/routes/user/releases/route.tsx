import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { Release } from "../../../components/release";
import type { TRelease } from "../../../types/releases";

export const Route = createFileRoute("/user/releases")({
  component: RouteComponent,
});

function RouteComponent() {
  const { getToken, userId } = useAuth();

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const token = await getToken();
      const url = `https://happy-heartily-kid.ngrok-free.app/api/users/${userId}/releases`;
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
    queryKey: ["data"],
  });

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-8">
      {isLoading ? (
        "loading"
      ) : (
        <>{data && data?.data?.map((r) => <Release {...r} />)}</>
      )}
      <Link to={"/user/new-release"}>New Release</Link>
    </div>
  );
}
