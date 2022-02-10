import classNames from "classnames";
import { forwardRef, HTMLAttributes, Ref } from "react";

const inputClasses = classNames(
  "text-black",
  "border",
  "rounded",
  "px-4",
  "outline-none"
);

export const TextInput = forwardRef(
  (props: HTMLAttributes<HTMLInputElement>, ref: Ref<HTMLInputElement>) => {
    const { className, ...rest } = props;

    return (
      <input
        ref={ref}
        {...rest}
        className={classNames(className, inputClasses)}
      />
    );
  }
);
