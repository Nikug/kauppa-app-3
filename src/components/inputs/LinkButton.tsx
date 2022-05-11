import classNames from "classnames";
import React, { forwardRef, RefAttributes } from "react";
import { Link, LinkProps } from "react-router-dom";
import { buttonClasses } from "./Button";

export const LinkButton = forwardRef<
  HTMLAnchorElement & RefAttributes<HTMLAnchorElement>,
  LinkProps
>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <Link ref={ref} {...rest} className={classNames(className, buttonClasses)}>
      {children}
    </Link>
  );
});
