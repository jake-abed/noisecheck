import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
} from '@clerk/clerk-react';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
	return (
		<header className='w-full h-12 bg-rose-600 flex justify-between items-center p-4'>
			<div></div>
			<div>
				<p className='font-header text-2xl'>noisecheck</p>
			</div>
			<nav className='w-12 h-8'>
				<SignedOut>
					<SignInButton>
						<button className='flex justify-center items-center'>
							<FontAwesomeIcon className='text-3xl' icon={faCircleUser} />
						</button>
					</SignInButton>
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</nav>
		</header>
	);
}
