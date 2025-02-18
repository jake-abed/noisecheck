import React from "react";

type TextInputProps = {
  labelText: string;
  labelSubtext?: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id: string;
};

export default function TextInput(props: TextInputProps) {
  return (
    <label
      htmlFor={props.id}
      className="inline w-full flex flex-col items-start gap-2"
    >
      {props.labelText}
      {props.labelSubtext ? (
        <span className="inline font-light text-xs">{props.labelSubtext}</span>
      ) : null}
      <input
        className="w-full mt-2 px-2 py-1 bg-zinc-100 rounded text-zinc-950"
        type="text"
        id={props.id}
        name={props.id}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </label>
  );
}
