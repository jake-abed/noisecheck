import { createFileRoute, Outlet, Link } from '@tanstack/react-router';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';

export const Route = createFileRoute('/releases/')({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = useUser();

	return (
		<>
			<div className='flex flex-col justify-center items-center gap-4'>
				<SignedIn>
					<div>Hi {user?.username}!</div>
					<div>
						<h3>Releases will go here</h3>
					</div>
				</SignedIn>
				<SignedOut>
					<SignInButton />
				</SignedOut>
			</div>
			<Outlet />
		</>
	);
}
