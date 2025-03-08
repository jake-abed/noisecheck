import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ReleaseForm from "../../../components/release_form";
import { useAuth } from "@clerk/clerk-react";
import type { TRelease, TReleaseProps } from "~/types/releases";
import { useNewReleaseMutation } from "~/hooks/mutations/new_release";

export const Route = createFileRoute("/user/new-release")({
  component: RouteComponent,
});

function RouteComponent() {
  const mutation = useNewReleaseMutation();

  return (
    <div>
      <ReleaseForm
        name=""
        isPublic={false}
        mutation={mutation}
        action="create"
      />
    </div>
  );
}
