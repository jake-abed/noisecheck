import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useContext } from 'react';
import TrackForm from './track_form';
import AddTrack from './add_track';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useNavigate } from '@tanstack/react-router';
import type { TApiError } from '~/types/errors';
import type { TReleaseViewProps } from '~/types/releases';
import type { TReleaseWithTracks } from '~/types/api_results';
import type { TTrackProps } from '~/types/tracks';
import { PlayerContext } from '~/hooks/PlayerContext';

export default function ReleaseView({ releaseId }: TReleaseViewProps) {
	const [editingTrackId, setEditingTrackId] = useState<number | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);
	const { getToken } = useAuth();
	const { user, isLoaded: isUserLoaded } = useUser();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { playerInfo, setPlayerInfo } = useContext(PlayerContext);

	const refreshReleaseData = async () => {
		await queryClient.invalidateQueries({
			queryKey: ['release', releaseId],
		});

		await queryClient.invalidateQueries({
			queryKey: ['tracks', releaseId],
		});
	};

	const { data, error, isError, isLoading, refetch } = useQuery({
		queryFn: async () => {
			const res = await fetch(
				'https://happy-heartily-kid.ngrok-free.app/api/releases/' + releaseId,
				{
					method: 'GET',
					mode: 'cors',
					headers: {
						'ngrok-skip-browser-warning': 'true',
					},
				}
			);

			if (res.status != 200) {
				const body = (await res.json()) as TApiError;
				throw new Error(body.error);
			}

			const body = (await res.json()) as TReleaseWithTracks;
			return body;
		},
		queryKey: ['release', releaseId],
	});

	const isOwner = isUserLoaded && user && data?.release?.userId === user.id;

	const handleEditTrack = (trackId: number) => {
		setEditingTrackId(trackId);
	};

	const handleCancelEdit = () => {
		setEditingTrackId(null);
	};

	const handleDeleteRelease = async () => {
		if (!isOwner || !data?.release?.id) return;

		try {
			setIsDeleting(true);
			const token = await getToken();

			const res = await fetch(
				`https://happy-heartily-kid.ngrok-free.app/api/releases/${data.release.id}`,
				{
					method: 'DELETE',
					mode: 'cors',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);

			if (res.ok) {
				// Navigate back to user's releases page after successful deletion
				navigate({ to: '/user/releases' });
			} else {
				throw new Error('Failed to delete release');
			}
		} catch (error) {
			console.error('Error deleting release:', error);
			alert('Failed to delete release. Please try again.');
		} finally {
			setIsDeleting(false);
		}
	};

	const handleEditRelease = () => {
		if (!isOwner || !data?.release?.id) return;
		navigate({
			to: '/releases/$releaseId/view',
			params: { releaseId: releaseId },
		});
	};

	const handlePlayTrack = (trackIdx: number) => {
		if (!data) return;
		if (data.tracks.length === 0) return;
		if (!setPlayerInfo) return;

		setPlayerInfo({
			...playerInfo,
			currentTrack: trackIdx,
			playlist: data.tracks,
			playing: true,
		});
	};

	const updateTrackMutation = useMutation({
		mutationFn: async (value: TTrackProps) => {
			const token = await getToken();

			const basicInfo = {
				name: value.name,
				releaseId: Number(releaseId),
			};

			const formData = new FormData();
			formData.append('data', JSON.stringify(basicInfo));
			if (value.file) {
				formData.append('file', value.file);
			}

			const res = await fetch(
				`https://happy-heartily-kid.ngrok-free.app/api/tracks/${value.id}`,
				{
					method: 'PUT',
					mode: 'cors',
					headers: { Authorization: `Bearer ${token}` },
					body: formData,
				}
			);

			if (res.ok) {
				// Reset editing state
				setEditingTrackId(null);
				// Refresh the data
				await refetch();
			} else {
				throw new Error("Couldn't update the track!");
			}
		},
	});

	if (isError) {
		return (
			<div>
				<p>Uh oh! Something went wrong!</p>
				<p>
					{error.name}: {error.message}
				</p>
			</div>
		);
	}

	return (
		<div className='mx-auto flex justify-center items-'>
			{isLoading ? 'loading' : undefined}
			{!isLoading && data ? (
				<div className='flex flex-col p-4 bg-zinc-700 rounded-lg shadow-lg max-w-96'>
					<div className='flex justify-between items-start gap-8 mb-4'>
						<div>
							<h2 className='text-xl font-bold'>{data.release?.name}</h2>
							<p className='text-zinc-300'>
								Released{' '}
								{new Date(data.release?.createdAt || '').toLocaleDateString()}
							</p>
							{data.release?.isPublic ? (
								<span className='text-sm text-emerald-500'>Public</span>
							) : (
								<span className='text-sm text-amber-500'>Private</span>
							)}
						</div>
						<img
							src={data.release?.imageUrl}
							height='100'
							width='100'
							alt={data.release?.name}
							className='rounded-lg'
						/>
					</div>

					{/* Owner-specific controls */}
					{isOwner && (
						<>
							<div className='flex gap-2 mt-2 mb-4'>
								<button
									onClick={handleEditRelease}
									className='px-3 py-1 bg-cyan-700 hover:bg-cyan-800 rounded text-white text-sm'
								>
									Edit Release
								</button>
								<button
									onClick={handleDeleteRelease}
									disabled={isDeleting}
									className='px-3 py-1 bg-rose-700 hover:bg-rose-800 rounded text-white text-sm'
								>
									{isDeleting ? 'Deleting...' : 'Delete Release'}
								</button>
							</div>
							<AddTrack
								releaseId={Number(releaseId)}
								onTrackAdded={refreshReleaseData}
							/>
						</>
					)}

					<div className='border-t border-zinc-500 pt-4'>
						<h3 className='text-lg font-semibold mb-2'>Tracks</h3>
						<div className='flex flex-col gap-2'>
							{data.tracks?.map((track, idx) => (
								<div key={track.id}>
									{editingTrackId === track.id ? (
										<div className='bg-zinc-600 p-3 rounded-lg'>
											<TrackForm
												name={track.name}
												releaseId={Number(releaseId)}
												mutation={updateTrackMutation}
												action='update'
											/>
											<button
												onClick={handleCancelEdit}
												className='mt-2 px-3 py-1 bg-zinc-400 rounded text-sm'
											>
												Cancel
											</button>
										</div>
									) : (
										<div className='flex justify-between items-center'>
											<div>
												<p>{track.name}</p>
												<p className='text-zinc-300'>
													{Math.floor(track.length / 60)}:
													{String(track.length % 60).padStart(2, '0')}
												</p>
											</div>
											{/* Only show edit button if user is the owner */}
											{isOwner && (
												<button
													onClick={() => handleEditTrack(track.id)}
													className='ml-auto mr-4 px-3 py-1 bg-rose-400 rounded text-sm'
												>
													Edit
												</button>
											)}
											<p
												className='bg-emerald-500 rounded px-3 py-2'
												onClick={() => handlePlayTrack(idx)}
											>
												Play
											</p>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			) : undefined}
		</div>
	);
}
