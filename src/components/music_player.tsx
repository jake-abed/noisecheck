import { useRef, useState, useContext } from 'react';
import { useWavesurfer } from '@wavesurfer/react';
import { PlayerContext } from '~/hooks/PlayerContext';

export default function MusicPlayer() {
	const [hidden, setHidden] = useState<boolean>(true);
	const { playerInfo, setPlayerInfo } = useContext(PlayerContext);

	const handleHiddenToggle = () => {
		setHidden(!hidden);
	};
	return (
		<>
			<div
				className='absolute text-center align-middle left-2 bottom-2 h-auto w-auto p-4 bg-rose-800 rounded-full'
				onClick={handleHiddenToggle}
			>
				{hidden ? 'Show' : 'Hide'} Player
			</div>
			<div>Playlist: {playerInfo.playlist.toString()}</div>
		</>
	);
}
