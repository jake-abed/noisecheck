import type { Track } from "./tracks";
import type { Dispatch, SetStateAction } from "react";

export type CrudActions = "create" | "update" | "delete" | "view";

export type PlayerInfo = {
  currentTrack?: number;
  playlist: Track[];
  queue: Track[];
  playing: boolean;
};

export type PlayerContext = {
  playerInfo: PlayerInfo;
  setPlayerInfo?: Dispatch<SetStateAction<PlayerInfo>>;
};
