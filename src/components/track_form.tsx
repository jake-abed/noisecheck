import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { titleCaseWord } from "../utils/utils";
import { TTrackProps } from "~/types/tracks";

export default function TrackForm({
  name,
  releaseId,
  file,
  mutation,
  action,
}: TTrackProps) {
  const form = useForm({
    defaultValues: {
      name: name,
      releaseId: releaseId,
      file: file,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate({ ...value, action, mutation });
    },
  });

  if (mutation.isPending) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <h2>{titleCaseWord(action)} Track</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col mx-auto max-w-72 gap-4"
      >
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => {
              if (!value) return "A name is required!";
              if (value.length < 3)
                return "Name must be greater than 3 characters!";
              return undefined;
            },
          }}
          children={(field) => {
            return (
              <>
                <label
                  htmlFor={field.name}
                  className="inline w-full flex flex-col items-start gap-2"
                >
                  Release Name:
                  <input
                    className="w-full mt-2 px-2 py-1 bg-zinc-100 rounded text-zinc-950"
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder={"Some Name"}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </label>
              </>
            );
          }}
        />
        <form.Field
          name="file"
          children={(field) => {
            return (
              <>
                <label
                  htmlFor={field.name}
                  className="inline w-full flex flex-col items-start gap-2"
                >
                  Choose a File:
                  <span className="text-sm text-light"> (.wav or .flac)</span>
                  <input
                    className="w-full mt-2 px-2 py-1 bg-zinc-100 rounded text-zinc-950"
                    type="file"
                    required={true}
                    accept=".wav,.flac"
                    id={field.name}
                    name={field.name}
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        return field.handleChange(e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </>
            );
          }}
        />
        <button
          type="submit"
          className="text-zinc-950 text-lg text-bold uppercase bg-rose-400 rounded p-3"
        >
          {action} Track
        </button>
      </form>
    </div>
  );
}
