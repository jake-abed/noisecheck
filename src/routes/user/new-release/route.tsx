import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ReleaseForm } from '../../../components/release_form';
import type { Release } from '../../../components/release_form';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';

export const Route = createFileRoute('/user/new-release')({
	component: RouteComponent,
});

export type NewRelease = {
	id?: number;
	name: string;
	user_id?: string;
	url?: string;
	img_url: string;
	is_public: boolean;
	is_single: boolean;
};

function RouteComponent() {
	function useClerkMutation() {
		const { getToken } = useAuth();
		const navigate = useNavigate({ from: '/releases/$releaseId/view' });

		return useMutation({
			mutationFn: async (release: NewRelease) => {
				const token = await getToken();
				console.log(token);
				const res = await fetch(
					'https://happy-heartily-kid.ngrok-free.app/api/releases',
					{
						method: 'POST',
						mode: 'cors',
						headers: { Authorization: `Bearer ${token}` },
						body: JSON.stringify(release),
					}
				);

				if (!res.ok) {
					throw new Error('Network response error');
				}

				const body = await res.json();
				const newRelease = body as NewRelease;
				const id = newRelease.id;
				navigate({
					to: '/releases/$releaseId/view',
					params: { releaseId: String(id) },
				});
			},
		});
	}

	const newReleaseMutation = useClerkMutation();

	const blankRelease: Release = {
		name: '',
		imageUrl: '',
		isPublic: false,
		isSingle: false,
		mutation: newReleaseMutation,
	};
	return (
		<div>
			<ReleaseForm {...blankRelease} />
		</div>
	);
}
