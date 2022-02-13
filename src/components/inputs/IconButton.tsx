import classNames from "classnames";
import { HTMLAttributes, ReactNode } from "react";

const classes = "h-6 w-6";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
}

export const IconButton = (props: Props) => {
  const { icon, className, ...rest } = props;

  return (
    <button {...rest} className={classNames(classes, className)}>
      {icon}
    </button>
  );
};
