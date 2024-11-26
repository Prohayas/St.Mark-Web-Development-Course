import React, { forwardRef } from "react";

type InputTypes = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  type: "text" | "number" | "checkbox" | "file" | "radio";
  id?: string;
  label?: string;
  labelStyle?: string;
  placeholder?: string;
  checked?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputTypes>(function Input(
  props,
  ref
) {
  const { labelStyle, label, type, ...rest } = props;

  return (
    <>
      <label className={`${labelStyle} text-sm text-gray- font-semibold`}>
        {label}

        <input
          {...rest}
          type={type}
          className={`${
            type === "text" || type === "number"
              ? "px-2 py-1 mb-5 w-full border-b focus:outline-none border-b-gray-600 text-sm"
              : "cursor-pointer"
          }`}
          ref={ref}
        />
      </label>
    </>
  );
});

export default Input;
