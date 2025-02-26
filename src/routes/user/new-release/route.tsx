import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ReleaseForm from "../../../components/release_form";

export const Route = createFileRoute("/user/new-release")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ReleaseForm name="" isPublic={false} />
    </div>
  );
}
