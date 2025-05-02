import { Link } from '@tanstack/react-router';
import { SignedIn } from '@clerk/clerk-react';

export default function Nav() {
	return (
		<div className='px-8 py-4 bg-zinc-800 flex gap-4 text-xl items-center font-header'>
			<Link
				to='/'
				activeProps={{
					className: 'font-bold',
				}}
				activeOptions={{ exact: true }}
			>
				Home
			</Link>
			<Link
				to='/releases'
				activeProps={{
					className: 'font-bold',
				}}
			>
				Releases
			</Link>
			<SignedIn>
				<Link
					to='/user/releases'
					activeProps={{
						className: 'font-bold',
					}}
				>
					User
				</Link>
			</SignedIn>
		</div>
	);
}
