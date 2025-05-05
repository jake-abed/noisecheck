import { TCrudActions } from "./misc";
import type { UseMutationResult } from "@tanstack/react-query";

export type TRelease = {
  id: number;
  name: string;
  userId: string;
  url?: string;
  imageUrl: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  username?: string;
};

export type TReleaseProps = {
  id?: number;
  name: string;
  isPublic: boolean;
  file?: File;
  action: TCrudActions;
  mutation: UseMutationResult<void, Error, TReleaseProps, unknown>;
};

export type TReleaseViewProps = {
  releaseId: string;
};
