import React, {
  useRef,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { PlayerContext } from "~/hooks/PlayerContext";
import ReactPlayer from "react-player";

export default function MusicPlayer() {
  const [hidden, setHidden] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1.0);
  const { playerInfo, setPlayerInfo } = useContext(PlayerContext);

  const playerRef = useRef(null);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.currentTarget?.value));
  };

  const handlePlayPauseChange = () => {
    setPlaying(!playing);
  };

  const handleHiddenToggle = () => {
    setHidden(!hidden);
  };
  return (
    <>
      <div
        className="absolute z-20 text-center align-middle left-2 bottom-2 h-auto w-auto p-4 bg-rose-800 rounded-full"
        onClick={handleHiddenToggle}
      >
        {hidden ? "Show" : "Hide"} Player
      </div>
      <div
        className={
          hidden
            ? "absolute h-0 bottom-0 w-full transition-all bg-zinc-800 overflow-hidden"
            : "absolute transition-all z-10 bottom-0 h-60 w-full bg-zinc-800"
        }
      >
        <div className="flex gap-8 bg-zinc-700 p-8">
          <ReactPlayer
            ref={playerRef}
            playing={playing}
            volume={volume}
            height={0}
            width={0}
            url="https://d1asgon1i6nus4.cloudfront.net/track/audio/lossless/jLuN-2r8eAQ-CaveDance.wav"
          ></ReactPlayer>
          <button onClick={handlePlayPauseChange}>Play</button>
          <input
            type="range"
            min={0}
            max={1.0}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
          ></input>
        </div>
        <p>
          Current Track:{" "}
          {!!playerInfo.currentTrack
            ? playerInfo.playlist[playerInfo.currentTrack].name
            : "None"}
        </p>
      </div>
    </>
  );
}
