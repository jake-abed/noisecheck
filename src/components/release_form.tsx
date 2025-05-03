import { useForm } from '@tanstack/react-form';
import { titleCaseWord } from '~/utils/utils';
import { Input } from './ui/input';
import { Card } from './ui/card';
import type { TReleaseProps } from '~/types/releases';
import { Checkbox } from './ui/checkbox';
import { cn } from '~/lib/utils';

export default function ReleaseForm({
	name,
	isPublic,
	file,
	mutation,
	action,
}: TReleaseProps) {
	const form = useForm({
		defaultValues: {
			name: name,
			isPublic: isPublic,
			file: file,
		},
		onSubmit: async ({ value }) => {
			if (value) {
				mutation.mutate({ ...value, action, mutation });
			}
		},
	});

	if (mutation.isPending) {
		return <p>loading...</p>;
	}

	return (
		<Card className={cn('w-[380px] bg-rose-900')}>
			<h2 className='text-center font-header'>{titleCaseWord(action)} Track</h2>
			<form
				className='flex flex-col gap-8 p-4'
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<form.Field
					name='name'
					validators={{
						onChange: ({ value }) => {
							if (!value) return 'A name is required!';
							if (value.length < 3) return 'Must be 3 or more characters!';
							return undefined;
						},
					}}
					children={(field) => {
						return (
							<>
								<label htmlFor={field.name}>
									Release Name:
									<Input
										type='text'
										className='bg-white text-black font-semibold text-xl selection:bg-rose-200'
										id={field.name}
										name={field.name}
										value={field.state.value}
										placeholder={"Your Release's Name"}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									{field.state.meta.isTouched && field.state.meta.errors ? (
										<div className='text-red-400 text-sm mt-1'>
											{field.state.meta.errors}
										</div>
									) : null}
								</label>
							</>
						);
					}}
				/>
				<form.Field
					name='isPublic'
					children={(field) => {
						return (
							<>
								<label
									htmlFor={field.name}
									className='flex items-center gap-2 text-white'
								>
									Public?
									<Checkbox
										id={field.name}
										name={field.name}
										checked={field.state.value}
										//@ts-ignore
										onCheckedChange={field.handleChange}
									/>
								</label>
							</>
						);
					}}
				/>
				<form.Field
					name='file'
					validators={{
						onChange: ({ value }) => {
							if (!value) return 'A file is required!';

							// Check file type
							const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
							if (!validTypes.includes(value.type)) {
								return 'Please upload a valid image file (JPG, JPEG, or PNG).';
							}

							// Check file size (1MB = 1048576 bytes)
							if (value.size > 1048576) {
								return 'Image size must be less than 1MB.';
							}

							return undefined;
						},
						onChangeAsync: async ({ value }) => {
							if (!value) return undefined;

							// Create a promise to check aspect ratio
							return new Promise((resolve) => {
								const objectUrl = URL.createObjectURL(value);
								const img = new Image();
								img.src = objectUrl;

								img.onload = () => {
									URL.revokeObjectURL(objectUrl);

									// Check if the image is square (1:1 aspect ratio)
									if (Math.abs(img.width - img.height) > 10) {
										resolve('Image must have a 1:1 aspect ratio (square).');
									} else {
										resolve(undefined);
									}
								};

								img.onerror = () => {
									URL.revokeObjectURL(objectUrl);
									resolve('Failed to load image. Please try another file.');
								};
							});
						},
					}}
					children={(field) => {
						return (
							<>
								<label
									htmlFor={field.name}
									className='inline w-full flex flex-col items-start gap-2 text-white'
								>
									Choose a File:{' '}
									<span className='text-sm text-gray-300'>
										(Square image: PNG or JPG, max 1MB)
									</span>
									<input
										className='w-full mt-2 px-2 py-1 bg-zinc-100 rounded text-zinc-950'
										type='file'
										required={true}
										accept='.jpg,.jpeg,.png'
										id={field.name}
										name={field.name}
										onChange={(e) => {
											if (e.target.files && e.target.files.length > 0) {
												return field.handleChange(e.target.files[0]);
											}
										}}
									/>
									{field.state.meta.isTouched && field.state.meta.errors ? (
										<div className='text-red-400 text-sm mt-1'>
											{field.state.meta.errors.toString()}
										</div>
									) : null}
								</label>
							</>
						);
					}}
				/>
				<button
					type='submit'
					className='text-zinc-950 text-lg font-bold uppercase bg-rose-400 rounded p-3 mt-2 hover:bg-rose-500 transition-colors'
				>
					{action} Release
				</button>
			</form>
		</Card>
	);
}
