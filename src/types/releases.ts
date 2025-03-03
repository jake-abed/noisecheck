import { TCrudActions } from "./misc";

export type TRelease = {
  id: number;
  name: string;
  userId?: string;
  url?: string;
  imageUrl: string;
  isPublic: boolean;
  createdAt?: string;
  updatedAt?: string;
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
