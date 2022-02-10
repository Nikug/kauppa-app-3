import classNames from "classnames";
import { forwardRef, HTMLAttributes, Ref } from "react";

export const buttonClasses = classNames(
  "text-white",
  "rounded",
  "shadow",
  "px-4",
  "py-2",
  "bg-indigo-600",
  "hover:bg-indigo-700"
);

export const Button = forwardRef(
  (props: HTMLAttributes<HTMLButtonElement>, ref: Ref<HTMLButtonElement>) => {
    const { children, className, ...rest } = props;

    return (
      <button
        ref={ref}
        {...rest}
        className={classNames(className, buttonClasses)}
      >
        {children}
      </button>
    );
  }
);
