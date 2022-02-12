import classNames from "classnames";
import { forwardRef, HTMLAttributes, Ref } from "react";
import { CheckIcon } from "@heroicons/react/solid";

const checkboxClasses = [
  "appearance-none",
  "relative",
  "peer",
  "w-8",
  "h-8",
  "rounded-lg",
  "border-2",
  "checked:border-none",
  "checked:bg-primary",
  "transition-all",
  "duration-75",
];

export const Checkbox = forwardRef(
  (props: HTMLAttributes<HTMLInputElement>, ref: Ref<HTMLInputElement>) => {
    const { className, ...rest } = props;

    return (
      <>
        <input
          type="checkbox"
          {...rest}
          className={classNames(className, checkboxClasses)}
          ref={ref}
        />
        <CheckIcon className="w-6 h-6 ml-1 text-white hidden peer-checked:block absolute pointer-events-none" />
      </>
    );
  }
);
