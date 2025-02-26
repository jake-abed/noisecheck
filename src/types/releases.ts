export type TRelease = {
	id: number;
	name: string;
	user_id?: string;
	url?: string;
	image_url: string;
	is_public: boolean;
};

export type NewReleaseProps = {
	name: string;
	isPublic: boolean;
	file?: File;
};
