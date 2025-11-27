import { Release } from "./releases";
import { Track } from "./tracks";

export type ReleaseWithTracks = {
  release: Release;
  tracks: Track[];
};
