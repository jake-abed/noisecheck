import React, { useState } from "react";
import TextInput from "./inputs/text-input";
import CheckBoxInput from "./inputs/checkbox-input";
import { UseMutationResult } from "@tanstack/react-query";
import type { NewRelease } from "../routes/user/new-release/route";

export type Release = {
  name: string;
  imageUrl: string;
  isPublic: boolean;
  isSingle: boolean;
  mutation: UseMutationResult<any, Error, NewRelease, unknown>;
};

export function ReleaseForm(props: Release) {
  let [r, setRelease] = useState<Release>(props);

  function updateName(e: React.ChangeEvent<HTMLInputElement>) {
    const newName = e.target.value;
    if (newName != null) {
      setRelease({ ...r, name: newName });
    }
  }

  function updateImageUrl(e: React.ChangeEvent<HTMLInputElement>) {
    const newUrl = e.target.value;
    if (newUrl != null) {
      setRelease({ ...r, imageUrl: newUrl });
    }
  }

  function updateSingle(e: React.ChangeEvent<HTMLInputElement>) {
    const newIsSingle = e.target.checked;
    setRelease({ ...r, isSingle: newIsSingle });
  }

  function updatePublic(e: React.ChangeEvent<HTMLInputElement>) {
    const newIsPublic = e.target.checked;
    setRelease({ ...r, isPublic: newIsPublic });
  }

  function handleSubmit(e: React.PointerEvent<HTMLInputElement>) {
    e.preventDefault();
    const newRel: NewRelease = {
      name: r.name,
      img_url: r.imageUrl,
      is_public: r.isPublic,
      is_single: r.isSingle,
    };
    r.mutation.mutate(newRel);
  }

  return (
    <div className="m-auto w-svw p-4 max-w-xl">
      <h2 className="text-xl p-2">Add New Release:</h2>
      <form className="m-auto w-full p-4 bg-zinc-800 rounded flex flex-col gap-4 justify-center items-center">
        <TextInput
          labelText="Release Name:"
          id="name"
          value={r.name}
          placeholder="Release Name"
          onChange={updateName}
        />
        <TextInput
          labelText="Release Image"
          labelSubtext=" (1:1) "
          id="imageURL"
          value={r.imageUrl}
          placeholder="https://some.img.url"
          onChange={updateImageUrl}
        />
        <CheckBoxInput
          labelText="Public?"
          id="public"
          value={r.isPublic}
          onChange={updatePublic}
        />
        <CheckBoxInput
          labelText="Single?"
          id="single"
          value={r.isSingle}
          onChange={updateSingle}
        />
        <input
          className="bg-rose-500 p-2 rounded"
          type="submit"
          value="ADD RELEASE"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}
