import { XIcon } from "@heroicons/react/solid";
import { ReactNode } from "react";

interface Props {
  onClose: () => void;
  title?: string;
  children?: ReactNode;
}

export const ModalBody = (props: Props) => {
  const { onClose, title, children } = props;

  return (
    <div className="fixed inset-0 z-10">
      <div
        className="bg-black opacity-50 w-full h-full absolute"
        onClick={onClose}
      />
      <div className="w-full h-full flex justify-center items-center">
        <div className="paper-hover bg-white px-4 py-2 relative w-full mx-2 max-w-content">
          <XIcon
            className="h-8 w-8 absolute top-2 right-2 cursor-pointer text-icon"
            onClick={onClose}
          />
          <h2 className="mb-8">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};
