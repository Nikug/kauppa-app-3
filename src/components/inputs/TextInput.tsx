import classNames from "classnames";
import { DetailedHTMLProps, forwardRef, Ref } from "react";

const inputClasses = (hasError: boolean) =>
  classNames(
    "text-black",
    "border",
    "rounded",
    "px-2",
    "outline-none",
    "w-full",
    {
      "border-error": hasError,
    }
  );

interface Props {
  error?: string;
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
    const { className, error, ...rest } = props;

    return (
      <div className={className}>
        <input ref={ref} {...rest} className={inputClasses(!!error)} />
        {error && <p className="text-error text-sm">{error}</p>}
      </div>
    );
  }
);
