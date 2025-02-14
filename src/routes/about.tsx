import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="p-2">
      <h3>About</h3>
      <p>
        noisecheck is a platform to share and listen to music. Meant for
        everyone, not just big bands and labels.
      </p>
    </div>
  );
}
