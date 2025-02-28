import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ReleaseForm from "../../../components/release_form";
import { useAuth } from "@clerk/clerk-react";
import type { TRelease, TReleaseProps } from "~/types/releases";

export const Route = createFileRoute("/user/new-release")({
  component: RouteComponent,
});

function RouteComponent() {
  const postNewRelease = () => {
    const { getToken } = useAuth();
    const navigate = useNavigate({ from: "/releases/$releaseId/view" });

    return async function (value: TReleaseProps) {
      const token = await getToken();

      const basicInfo = {
        name: value.name,
        isPublic: value.isPublic,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(basicInfo));
      if (value.file) {
        formData.append("file", value.file);
      }

      const res = await fetch(
        "https://happy-heartily-kid.ngrok-free.app/api/releases",
        {
          method: "POST",
          mode: "cors",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        },
      );

      const body = (await res.json()) as TRelease;

      navigate({
        to: "/releases/$releaseId/view",
        params: { releaseId: String(body.id) },
      });
    };
  };

  return (
    <div>
      <ReleaseForm
        name=""
        isPublic={false}
        submitFn={postNewRelease}
        action="create"
      />
    </div>
  );
}
