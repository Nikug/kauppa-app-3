import classNames from "classnames";
import { DetailedHTMLProps, forwardRef, Ref } from "react";

const inputClasses = (hasError: boolean, large?: boolean) =>
  classNames(
    "text-black",
    "border",
    "rounded",
    "px-2",
    "outline-none",
    "w-full",
    { "border-error": hasError },
    { "py-2": large }
  );

interface Props {
  error?: string;
  large?: boolean;
}

export const TextInput = forwardRef(
  (
    props: DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > &
      Props,
    ref: Ref<HTMLInputElement>
  ) => {
    const { className, error, large, ...rest } = props;

    return (
      <div className={className}>
        <input ref={ref} {...rest} className={inputClasses(!!error, large)} />
        {error && <p className="text-error text-sm">{error}</p>}
      </div>
    );
  }
);
