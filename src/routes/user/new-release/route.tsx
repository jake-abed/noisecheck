import { createFileRoute, useNavigate } from '@tanstack/react-router';
import ReleaseForm from '../../../components/release_form';

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
