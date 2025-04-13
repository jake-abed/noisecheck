import React, { useRef, useState, useContext, useMemo } from "react";
import { PlayerContext } from "~/hooks/PlayerContext";
import ReactPlayer from "react-player";

export default function MusicPlayer() {
  const [hidden, setHidden] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const { playerInfo, setPlayerInfo } = useContext(PlayerContext);

  const playerRef = useRef(null);

  const currentUrl =
    playerInfo.currentTrack != undefined
      ? playerInfo.playlist[playerInfo.currentTrack].originalFileUrl
      : "";

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.currentTarget?.value));
  };

  const handlePlayPauseChange = () => {
    setPlayerInfo
      ? setPlayerInfo({ ...playerInfo, playing: !playerInfo.playing })
      : null;
  };

  console.log(currentUrl);

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
            playing={playerInfo.playing}
            volume={volume}
            height={0}
            width={0}
            url={
              currentUrl
                ? currentUrl
                : "https://t4.bcbits.com/stream/c9f357fc28d6fdc9005103d178af532b/mp3-128/495379684?p=0&amp;ts=1744582718&amp;t=c2e425513d1749736e25fe60709d0b70d2891a19&amp;token=1744582718_e4e5f2e73810fe03fa69ab633bc6d7bfbf7bfc88"
            }
            config={useMemo(() => {
              return {
                file: {
                  forceAudio: true,
                },
              };
            }, [])}
          ></ReactPlayer>
          <button onClick={handlePlayPauseChange}>
            {playerInfo.playing ? "Pause" : "Play"}
          </button>
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
