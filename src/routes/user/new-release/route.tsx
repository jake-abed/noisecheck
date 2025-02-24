import { createFileRoute, useNavigate } from '@tanstack/react-router';
import ReleaseForm from '../../../components/release_form_v2';
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
	return (
		<div>
			<ReleaseForm name='' isPublic={false} isSingle={false} />
		</div>
	);
}
