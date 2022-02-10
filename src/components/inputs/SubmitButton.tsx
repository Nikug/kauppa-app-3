import classNames from "classnames";
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, Ref } from "react";
import { buttonClasses } from "./Button";

export const SubmitButton = forwardRef(
  (
    props: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    ref: Ref<HTMLInputElement>
  ) => {
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
