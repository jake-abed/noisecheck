import { CrudActions } from "./misc";
import type { UseMutationResult } from "@tanstack/react-query";

export type Release = {
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

export type ReleaseProps = {
  id?: number;
  name: string;
  isPublic: boolean;
  file?: File;
  action: CrudActions;
  mutation: UseMutationResult<void, Error, ReleaseProps, unknown>;
};

export type ReleaseViewProps = {
  releaseId: string;
};
