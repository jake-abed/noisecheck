import type { TCrudActions } from "./misc";
import type { UseMutationResult } from "@tanstack/react-query";

export type TTrack = {
  id: number;
  name: string;
  length: number;
  originalFileUrl: string;
  mp3FileUrl: string;
  releaseId: number;
  createdAt?: string;
  updatedAt?: string;
};

export type TTrackProps = {
  id?: number;
  name: string;
  releaseId?: number;
  file?: File;
  action: TCrudActions;
  mutation: UseMutationResult<void, Error, TTrackProps, unknown>;
};
