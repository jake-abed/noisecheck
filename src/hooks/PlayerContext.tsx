import React, { createContext, useState } from "react";
import { TPlayerInfo, TPlayerContext } from "~/types/misc";

const initialValues: TPlayerInfo = { playlist: [], queue: [], playing: false };

export const PlayerContext = createContext<TPlayerContext>({
  playerInfo: initialValues,
});

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [playerInfo, setPlayerInfo] = useState<TPlayerInfo>(initialValues);

  return (
    <PlayerContext.Provider value={{ playerInfo, setPlayerInfo }}>
      {children}
    </PlayerContext.Provider>
  );
};
