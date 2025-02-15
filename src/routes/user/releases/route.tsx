import { createFileRoute } from "@tanstack/react-router";
import PostRelease from "../../../components/post_release";

export const Route = createFileRoute("/user/releases")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PostRelease />;
}
