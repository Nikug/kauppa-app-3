import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useModalContext } from "../../contexts/ModalContextProvider";
import { EditModal as EditModalType } from "../../types/modal";
import { Button } from "../inputs/Button";
import { SubmitButton } from "../inputs/SubmitButton";
import { TextInput } from "../inputs/TextInput";
import { ModalBody } from "./ModalBody";

interface Props {
  modal: EditModalType;
}

export const EditModal = (props: Props) => {
  const { modal } = props;
  const { dispatch } = useModalContext();
  const { register, handleSubmit, setFocus } = useForm({
    defaultValues: { value: modal.value },
  });

  useEffect(() => {
    setFocus("value");
  }, [setFocus]);

  const closeModal = () => dispatch({ type: "remove", payload: modal.uid });

  const onSubmit = (data: { value: string | undefined }) => {
    closeModal();
    if (modal.onOk) modal.onOk(data.value ?? "");
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
