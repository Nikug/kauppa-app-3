import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useModalContext } from "../../contexts/ModalContextProvider";
import { addUserToCollection, getUserByEmail } from "../../firebase/api";
import { AddUserModal as AddUserModalType } from "../../types/modal";
import { Button } from "../inputs/Button";
import { SubmitButton } from "../inputs/SubmitButton";
import { TextInput } from "../inputs/TextInput";
import { ModalBody } from "./ModalBody";

interface Props {
  modal: AddUserModalType;
}

export const AddUserModal = (props: Props) => {
  const { modal } = props;
  const { dispatch } = useModalContext();
  const { register, handleSubmit, setFocus } = useForm({
    defaultValues: { value: modal.value },
  });

  useEffect(() => {
    setFocus("value");
  }, [setFocus]);

  const closeModal = () => dispatch({ type: "remove", payload: modal.uid });

  const onSubmit = async (data: { value: string | undefined }) => {
    const user = await getUserByEmail(data.value);

    if (!user?.uid) {
      toast("User does not exist", { type: "error" });
      return;
    }
    const success = await addUserToCollection(user.uid, modal.collectionId);
    if (success) {
      toast.success(`Added ${data.value} to ${modal.collectionId}`);
    }

    closeModal();
  };

  const onCancel = () => {
    closeModal();
    if (modal.onCancel) modal.onCancel();
  };

  return (
    <ModalBody onClose={onCancel} title={modal.title}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {modal.label && <label>{modal.label}</label>}
        <TextInput {...register("value")} />
        <div className="flex mt-4 justify-end gap-x-8">
          <Button onClick={onCancel} className="secondary">
            {modal.cancelButtonText ?? "Cancel"}
          </Button>
          <SubmitButton
            value={modal.okButtonText ?? "Ok"}
            className="primary"
          />
        </div>
      </form>
    </ModalBody>
  );
};
