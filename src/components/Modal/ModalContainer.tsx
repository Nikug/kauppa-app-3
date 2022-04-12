import { EditModal } from ".";
import {
  EditModal as EditModalType,
  ConfirmationModal as ConfirmationModalType,
  AddUserModal as AddUserModalType,
  Modal,
} from "../../types/modal";
import { useModalContext } from "../../contexts/ModalContextProvider";
import { ConfirmationModal } from "./ConfirmationModal";
import { AddUserModal } from "./AddUserModal";

export const isEditModal = (modal: Modal): modal is EditModalType =>
  modal.type === "edit";
export const isConfirmationModal = (
  modal: Modal
): modal is ConfirmationModalType => modal.type === "confirmation";
export const isAddUserModal = (modal: Modal): modal is AddUserModalType =>
  modal.type === "addUser";

export const ModalContainer = () => {
  const { modals } = useModalContext();

  return (
    <>
      {modals.map((modal) => {
        if (isEditModal(modal)) {
          return <EditModal key={modal.uid} modal={modal} />;
        } else if (isConfirmationModal(modal)) {
          return <ConfirmationModal key={modal.uid} modal={modal} />;
        } else if (isAddUserModal(modal)) {
          return <AddUserModal key={modal.uid} modal={modal} />;
        }
        return null;
      })}
    </>
  );
};
