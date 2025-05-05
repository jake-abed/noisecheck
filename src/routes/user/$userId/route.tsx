import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/user/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = useParams({ strict: false });
  return <div>Hello "/user/"{userId}"qua"</div>;
}
