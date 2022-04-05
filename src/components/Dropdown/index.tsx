import { ChevronDownIcon } from "@heroicons/react/solid";
import React, {
  ReactNode,
  HTMLAttributes,
  useState,
  useCallback,
  useEffect,
} from "react";
import { usePopper } from "react-popper";
import { Portal } from "../Portal";
import { sameWidth } from "./PopperModifiers";

const selectClasses = `px-4
  py-2
  block
  w-full
  flex
  items-center
  cursor-pointer
  `;
const optionClasses = `px-4
  bg-white
  text-black
  hover:bg-primary
  hover:text-white
  `;

interface Props {
  className?: string;
  children?: ReactNode;
  value?: string | number | null;
}

export const Dropdown = (props: HTMLAttributes<HTMLDivElement> & Props) => {
  const { className, children, value, ...rest } = props;
  const [open, setOpen] = useState(false);

  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [sameWidth],
  });

  const handleClick = useCallback(
    (event: MouseEvent | React.MouseEvent) => {
      if (
        !referenceElement?.contains(event.target as Node) &&
        !popperElement?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    },
    [referenceElement, popperElement]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [handleClick]);

  return (
    <>
      <div
        ref={setReferenceElement}
        {...rest}
        className={selectClasses}
        onClick={() => setOpen((prev) => !prev)}
      >
        {value} <ChevronDownIcon className="w-4 h-4 mt-1 ml-2" />
      </div>
      {open && (
        <Portal>
          <div
            ref={setPopperElement}
            className="paper-hover bg-white py-2"
            style={styles.popper}
            {...attributes.popper}
          >
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  className: optionClasses,
                  onClick: () => {
                    setOpen(false);
                    if (child.props.onClick) child.props.onClick();
                  },
                });
              }
            })}
          </div>
        </Portal>
      )}
    </>
  );
};
