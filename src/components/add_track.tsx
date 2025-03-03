import TrackForm from "./track_form";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "@tanstack/react-router";
import type { TTrack, TTrackProps } from "~/types/tracks";

export default function AddTrack(props: { releaseId: number }) {
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate({ from: "/releases/$releaseId/view" });

  const handleAddTrackClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  const postNewTrack = () => {
    const { getToken } = useAuth();

    return async function (value: TTrackProps) {
      const token = await getToken();

      const basicInfo = {
        name: value.name,
        releaseId: props.releaseId,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(basicInfo));
      if (value.file) {
        formData.append("file", value.file);
      }

      const res = await fetch(
        "https://happy-heartily-kid.ngrok-free.app/api/tracks",
        {
          method: "POST",
          mode: "cors",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        },
      );

      if (res.ok) {
        navigate({
          to: "/releases/$releaseId/view",
          params: { releaseId: String(props.releaseId) },
        });
      } else {
        throw new Error("Uh oh, couldn't post the song!");
      }
    };
  };

  if (!editing) {
    return (
      <div className="flex flex-col justify-center items-center">
        <button type="button" onClick={handleAddTrackClick}>
          Add New Track
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center">
        <TrackForm
          name=""
          releaseId={props.releaseId}
          submitFn={postNewTrack}
          action="create"
        />
        <button type="button" onClick={handleCancelClick}>
          CANCEL
        </button>
      </div>
    );
  }
}
