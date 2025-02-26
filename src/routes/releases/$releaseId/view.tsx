import { createFileRoute, useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import type { TRelease } from '../../../types/releases';

export const Route = createFileRoute('/releases/$releaseId/view')({
	component: RouteComponent,
});

function RouteComponent() {
	const { releaseId } = useParams({ strict: false });
	const { data, isLoading } = useQuery({
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

			const body = (await res.json()) as TRelease;
			console.log(body);
			return body;
		},
		queryKey: ['data'],
	});

	console.log(data?.image_url);

	return (
		<div>
			{isLoading ? 'loading' : `/releases/${data?.id}/view`}
			{data ? (
				<img src={data.image_url} height='100px' width='100px' />
			) : undefined}
		</div>
	);
}
