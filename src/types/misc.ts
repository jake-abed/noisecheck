import type { TTrack } from "./tracks";
import type { Dispatch, SetStateAction } from "react";

export type TCrudActions = "create" | "update" | "delete" | "view";

export type TPlayerInfo = {
  currentTrack?: number;
  playlist: TTrack[];
  queue: TTrack[];
  playing: boolean;
};

export type TPlayerContext = {
  playerInfo: TPlayerInfo;
  setPlayerInfo?: Dispatch<SetStateAction<TPlayerInfo>>;
};
