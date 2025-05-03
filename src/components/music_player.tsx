import React, { useRef, useState, useContext, useMemo } from 'react';
import { PlayerContext } from '~/hooks/PlayerContext';
import {
	faHeadphones,
	faPlay,
	faPause,
	faBackward,
	faForward,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPlayer from 'react-player';

export default function MusicPlayer() {
	const [hidden, setHidden] = useState<boolean>(false);
	const [volume, setVolume] = useState<number>(0.5);
	const { playerInfo, setPlayerInfo } = useContext(PlayerContext);

	const playerRef = useRef(null);

	const currentUrl =
		playerInfo.currentTrack != undefined
			? playerInfo.playlist[playerInfo.currentTrack].originalFileUrl
			: '';

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVolume(Number(e.currentTarget?.value));
	};

	const handlePlayPauseChange = () => {
		setPlayerInfo
			? setPlayerInfo({ ...playerInfo, playing: !playerInfo.playing })
			: null;
	};

	const handleHiddenToggle = () => {
		setHidden(!hidden);
	};

	return (
		<>
			<div
				className='fixed flex justify-center items-center z-20 text-center align-middle left-4 bottom-4 lg:left-8 lg:bottom-8 aspect-square w-12 h-12 p-2 bg-rose-900 rounded-lg border-white border-2 shadow-sm'
				onClick={handleHiddenToggle}
			>
				<FontAwesomeIcon
					icon={faHeadphones}
					className={
						hidden
							? 'p-2 text-3xl text-white align-middle transition-all'
							: 'p-2 text-3xl text-zinc-900 align-middle transition-all'
					}
					transform='down-0.5'
				/>
			</div>
			<div
				className={
					hidden
						? 'fixed h-0 bottom-0 w-full transition-all bg-zinc-900 overflow-hidden'
						: 'fixed transition-all z-10 bottom-0 h-96 lg:h-28 w-full bg-zinc-900 drop-shadow-[0_-2px_8px_#00000066]'
				}
			>
				<div className='flex h-full justify-center items-center flex-wrap gap-8 p-4 px-12'>
					<ReactPlayer
						ref={playerRef}
						playing={playerInfo.playing}
						volume={volume}
						height={0}
						width={0}
						url={
							currentUrl
								? currentUrl
								: 'https://t4.bcbits.com/stream/c9f357fc28d6fdc9005103d178af532b/mp3-128/495379684?p=0&amp;ts=1744582718&amp;t=c2e425513d1749736e25fe60709d0b70d2891a19&amp;token=1744582718_e4e5f2e73810fe03fa69ab633bc6d7bfbf7bfc88'
						}
						config={useMemo(() => {
							return {
								file: {
									forceAudio: true,
								},
							};
						}, [])}
					></ReactPlayer>
					<div className='flex gap-2 justify-center items-center'>
						<button className='min-w-8 min-h-8 bg-rose-900 rounded'>
							<FontAwesomeIcon icon={faBackward} />
						</button>
						<button
							onClick={handlePlayPauseChange}
							className='min-w-8 min-h-8 bg-rose-900 rounded'
						>
							{playerInfo.playing ? (
								<FontAwesomeIcon icon={faPause} />
							) : (
								<FontAwesomeIcon icon={faPlay} />
							)}
						</button>
						<button className='min-w-8 min-h-8 bg-rose-900 rounded'>
							<FontAwesomeIcon icon={faForward} />
						</button>
					</div>
					<label htmlFor='player-volume' className='flex gap-4'>
						Volume:
						<input
							id='player-volume'
							name='player-volume'
							type='range'
							min={0}
							max={1.0}
							step={0.01}
							value={volume}
							onChange={handleVolumeChange}
						></input>
					</label>
					<p className='px-24'>
						Current Track:{' '}
						{!!playerInfo.currentTrack || playerInfo.currentTrack === 0
							? playerInfo.playlist[playerInfo.currentTrack].name
							: 'None'}
					</p>
				</div>
			</div>
		</>
	);
}
