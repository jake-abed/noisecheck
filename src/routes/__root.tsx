import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { SignedIn } from '@clerk/clerk-react';
import Nav from '../components/nav';
import Header from '../components/header';

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<Header />
			<Nav />
			<Outlet />
			<TanStackRouterDevtools position='bottom-right' />
		</>
	);
}
