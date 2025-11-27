import type { CrudActions } from "./misc";
import type { UseMutationResult } from "@tanstack/react-query";

export type Track = {
  id: number;
  name: string;
  length: number;
  originalFileUrl: string;
  mp3FileUrl: string;
  releaseId: number;
  createdAt?: string;
  updatedAt?: string;
};

export type TrackProps = {
  id?: number;
  name: string;
  releaseId?: number;
  file?: File;
  action: CrudActions;
  mutation: UseMutationResult<void, Error, TrackProps, unknown>;
};
