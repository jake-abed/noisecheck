import React from "react";

type CheckboxProps = {
  labelText: string;
  labelSubtext?: string;
  id: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CheckBoxInput(props: CheckboxProps) {
  return (
    <label
      htmlFor={props.id}
      className="inline w-full flex flex-col items-start justify-center gap-2"
    >
      {props.labelText}
      {props.labelSubtext ? (
        <span className="inline font-light text-xs">{props.labelSubtext}</span>
      ) : null}
      <input
        className="p-8 ml-4"
        style={{ width: "24px", height: "24px" }}
        type="checkbox"
        checked={props.value}
        id={props.id}
        name={props.id}
        onChange={props.onChange}
      />
    </label>
  );
}
