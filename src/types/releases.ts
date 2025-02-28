import { TCrudActions } from "./misc";

export type TRelease = {
  id: number;
  name: string;
  user_id?: string;
  url?: string;
  image_url: string;
  is_public: boolean;
};

export type TReleaseProps = {
  id?: number;
  name: string;
  isPublic: boolean;
  file?: File;
  action: TCrudActions;
  submitFn: () => (value: any) => Promise<void>;
};

export type TReleaseViewProps = {
  releaseId: string;
};
