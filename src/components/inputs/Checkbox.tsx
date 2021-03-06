import classNames from "classnames";
import { forwardRef, Ref } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { InputProps } from "../../types/react";

const checkboxClasses = [
  "appearance-none",
  "peer",
  "w-8",
  "h-8",
  "rounded-lg",
  "border-2",
  "checked:border-none",
  "checked:bg-primary",
  "hover:checked:bg-primary-dark",
  "transition-all",
  "duration-75",
];

export const Checkbox = forwardRef(
  (props: InputProps, ref: Ref<HTMLInputElement>) => {
    const { className, ...rest } = props;

    return (
      <div className="relative">
        <input
          type="checkbox"
          {...rest}
          className={classNames(className, checkboxClasses)}
          ref={ref}
        />
        <CheckIcon className="absolute inset-1 text-white hidden peer-checked:block pointer-events-none" />
      </div>
    );
  }
);
