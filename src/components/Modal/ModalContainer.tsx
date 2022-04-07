import { Modal } from ".";
import { useModalContext } from "../../contexts/ModalContextProvider";

export const ModalContainer = () => {
  const { modals } = useModalContext();

  return (
    <>
      {modals.map((modal) => (
        <Modal key={modal.uid} modal={modal} />
      ))}
    </>
  );
};
