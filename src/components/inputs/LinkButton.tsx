import classNames from "classnames";
import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  Ref,
} from "react";
import { buttonClasses } from "./Button";

export const LinkButton = forwardRef(
  (
    props: DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    ref: Ref<HTMLAnchorElement>
  ) => {
    const { children, className, ...rest } = props;

    return (
      <a ref={ref} {...rest} className={classNames(className, buttonClasses)}>
        {children}
      </a>
    );
  }
);
