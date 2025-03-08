import { createFileRoute, Link } from "@tanstack/react-router";
import { createUserReleasesQueryOptions } from "~/hooks/queries/user_releases";
import { useQuery } from "@tanstack/react-query";
import { Release } from "../../../components/release";

export const Route = createFileRoute("/user/releases")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery(createUserReleasesQueryOptions());

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
