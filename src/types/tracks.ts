import type { TCrudActions } from "./misc";

export type TTrack = {
  id: number;
  name: string;
  releaseId: number;
  createdAt?: string;
  updatedAt?: string;
};

export type TTrackProps = {
  id?: number;
  name: string;
  releaseId: number;
  file?: File;
  action: TCrudActions;
  submitFn: () => (value: any) => Promise<void>;
};
