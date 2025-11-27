import React, { createContext, useState } from "react";
import { PlayerInfo, PlayerContext } from "~/types/misc";

const initialValues: PlayerInfo = { playlist: [], queue: [], playing: false };

export const PlayerContextWrapper = createContext<PlayerContext>({
  playerInfo: initialValues,
});

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>(initialValues);

  return (
    <PlayerContextWrapper.Provider value={{ playerInfo, setPlayerInfo }}>
      {children}
    </PlayerContextWrapper.Provider>
  );
};
