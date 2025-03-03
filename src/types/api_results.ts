import { TRelease } from "./releases";
import { TTrack } from "./tracks";

export type TReleaseWithTracks = {
  release: TRelease;
  tracks: Array<TTrack>;
};
