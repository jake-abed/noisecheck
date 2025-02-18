import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import PostRelease from "../../../components/post_release";

export const Route = createFileRoute("/user/releases")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Link to={"/user/new-release"}>New Release</Link>
      <Outlet />
    </div>
  );
}
