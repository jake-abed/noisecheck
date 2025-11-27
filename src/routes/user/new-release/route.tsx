import { createFileRoute } from "@tanstack/react-router";
import ReleaseForm from "../../../components/release_form";
import { useNewReleaseMutation } from "~/hooks/mutations/new_release";

export const Route = createFileRoute("/user/new-release")({
  component: RouteComponent,
});

function RouteComponent() {
  const mutation = useNewReleaseMutation();

  return (
    <div className="flex justify-center font-display">
      <ReleaseForm
        name=""
        isPublic={true}
        mutation={mutation}
        action="create"
      />
    </div>
  );
}
