import { useAuth } from '@clerk/clerk-react';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';

type NewReleaseProps = {
	name: string;
	isPublic: boolean;
	isSingle: boolean;
	file?: File;
};

export type NewRelease = {
	id?: number;
	name: string;
	user_id?: string;
	url?: string;
	img_url: string;
	is_public: boolean;
	is_single: boolean;
};

export default function ReleaseForm({
	name,
	isPublic,
	isSingle,
	file,
}: NewReleaseProps) {
	const postNewRelease = () => {
		const { getToken } = useAuth();

		return async function (value: NewReleaseProps) {
			const token = getToken();

			const basicInfo = {
				name: value.name,
				isPublic: value.isPublic,
				isSingle: value.isSingle,
			};

			const formData = new FormData();
			formData.append('data', JSON.stringify(basicInfo));
			if (value.file) {
				formData.append('file', value.file);
			}

			const res = await fetch(
				'https://happy-heartily-kid.ngrok-free.app/api/releases',
				{
					method: 'POST',
					mode: 'cors',
					headers: { Authorization: `Bearer ${token}` },
					body: formData,
				}
			);

			const body = (await res.json()) as NewRelease;

			navigate({
				to: '/releases/$releaseId/view',
				params: { releaseId: String(body.id) },
			});
		};
	};

	const navigate = useNavigate({ from: '/releases/$releaseId/view' });

	const newReleaseMutation = useMutation({
		mutationFn: postNewRelease(),
	});
	const form = useForm({
		defaultValues: {
			name: name,
			isPublic: isPublic,
			isSingle: isSingle,
			file: file,
		},
		onSubmit: async ({ value }) => {
			newReleaseMutation.mutate(value);
		},
	});

	if (newReleaseMutation.isPending) {
		return <p>loading...</p>;
	}

	return (
		<div>
			<h2>Create New Release</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className='mx-auto max-w-64 gap-4'
			>
				<form.Field
					name='name'
					validators={{
						onChange: ({ value }) => {
							if (!value) return 'A name is required!';
							if (value.length < 3)
								return 'Name must be greater than 3 characters!';
							return undefined;
						},
					}}
					children={(field) => {
						return (
							<>
								<label
									htmlFor={field.name}
									className='inline w-full flex flex-col items-start gap-2'
								>
									Release Name:
									<input
										className='w-full mt-2 px-2 py-1 bg-zinc-100 rounded text-zinc-950'
										type='text'
										id={field.name}
										name={field.name}
										value={field.state.value}
										placeholder={'Some Name'}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
								</label>
							</>
						);
					}}
				/>
				<form.Field
					name='isSingle'
					children={(field) => {
						return (
							<>
								<label
									htmlFor={field.name}
									className='inline w-full flex flex-col items-start gap-2'
								>
									Single?
									<input
										className='w-full mt-2 px-2 py-1 bg-zinc-100 rounded text-zinc-950'
										type='checkbox'
										id={field.name}
										name={field.name}
										placeholder={'Some Name'}
										onChange={(e) => field.handleChange(e.target.checked)}
									/>
								</label>
							</>
						);
					}}
				/>
			</form>
		</div>
	);
}
