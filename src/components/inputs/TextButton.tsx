import classNames from "classnames";
import { forwardRef, HTMLAttributes, Ref } from "react";

export const buttonClasses = classNames(
  "text-white",
  "px-4",
  "py-2",
  "font-bold",
  "cursor-pointer"
);

export const TextButton = forwardRef(
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
