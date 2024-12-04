import React, { forwardRef, useImperativeHandle, useRef } from "react";

type InputTypes = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  type: "text" | "number" | "checkbox" | "file" | "radio";
  id?: string;
  label?: string;
  labelStyle?: string;
  placeholder?: string;
  checked?: boolean;
  className?: string;
  defaultValue?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export type InputRef = {
  focus: () => void;
  value: () => string | undefined;
  checked: () => boolean | undefined;
  setValue: (val: string | undefined) => void;
};

const Input = forwardRef<InputRef, InputTypes>(function Input(props, ref) {
  const { labelStyle, label, type, className, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },
    value() {
      return inputRef.current?.value;
    },
    checked() {
      return inputRef.current?.checked;
    },
    setValue(val) {
      if (!inputRef.current) return;
      inputRef.current.value = String(val);
    },
  }));
  return (
    <>
      <label className={`${labelStyle} text-sm text-gray- font-semibold`}>
        <span>{label}</span>

        <input
          {...rest}
          type={type}
          className={
            `${
              type === "text" || type === "number"
                ? "px-2 w-full py-1 mb-5 border-b focus:outline-none border-b-gray-600 text-sm "
                : "cursor-pointer "
            }` + className
          }
          ref={inputRef}
        />
      </label>
    </>
  );
});

export default Input;
