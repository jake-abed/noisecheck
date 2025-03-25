import type { TTrack } from "./tracks";

export type TCrudActions = "create" | "update" | "delete" | "view";

export type TTrackContext = {
	currentTrack?: number;
	playlist: TTrack[];
	queue: TTrack[];
}