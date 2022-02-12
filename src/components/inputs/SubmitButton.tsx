import classNames from "classnames";
import { forwardRef, Ref } from "react";
import { InputProps } from "../../types/react";
import { buttonClasses } from "./Button";

export const SubmitButton = forwardRef(
  (props: InputProps, ref: Ref<HTMLInputElement>) => {
    const { children, className, ...rest } = props;

    return (
      <input
        type="submit"
        ref={ref}
        {...rest}
        className={classNames(className, buttonClasses)}
      >
        {children}
      </input>
    );
  }
);
