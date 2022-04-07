import { Modal } from ".";
import { useAppSelector } from "../../redux/hooks";
import { getEditModals } from "../../redux/modalSlice";

export const ModalContainer = () => {
  const editModals = useAppSelector(getEditModals);

  return (
    <>
      {editModals.map((modal) => (
        <Modal key={modal.uid} modal={modal} />
      ))}
    </>
  );
};
