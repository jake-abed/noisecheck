import TrackForm from "./track_form";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import type { TTrack, TTrackProps } from "~/types/tracks";

export default function AddTrack(props: {
  releaseId: number;
  onTrackAdded?: () => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const { getToken } = useAuth();

  const handleAddTrackClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  const postNewTrack = () => {
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
        // Reset the editing state
        setEditing(false);

        // Call the refresh function if provided
        if (props.onTrackAdded) {
          try {
            await props.onTrackAdded();
            console.log("Data refresh completed");
          } catch (error) {
            console.error("Error refreshing data:", error);
          }
        }

        // No need to navigate since we're already on the right page
        // and the data will be refreshed
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
