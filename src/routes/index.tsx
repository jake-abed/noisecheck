import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: HomeComponent,
});

function HomeComponent() {
	return (
		<>
			<div className='flex flex-col items-center justify-center min-h-[80svh] bg-gradient-to-b from-zinc-800 via-rose-800 to-zinc-800 text-white'>
				<h3 className='text-4xl font-header text-shadow-[0_1px_8px_rgb(0_0_0_/_0.65)] py-4'>
					Is This Thing On?
				</h3>
				<h2 className='text-xl py-2'>Oh yeah, it's on...</h2>
				<p>Noisecheck is a fun place to share audio with the world.</p>
				<p>Sign up & start sharing your noise today!</p>
			</div>
		</>
	);
}
