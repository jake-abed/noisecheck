import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/user/releases")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>All of your releases will go here!</div>;
}
