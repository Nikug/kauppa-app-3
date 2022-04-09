import { XIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useModalContext } from "../../contexts/ModalContextProvider";
import { EditModal } from "../../types/modal";
import { Button } from "../inputs/Button";
import { SubmitButton } from "../inputs/SubmitButton";
import { TextInput } from "../inputs/TextInput";

interface Props {
  modal: EditModal;
}

export const Modal = (props: Props) => {
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
    <div className="fixed inset-0 z-10">
      <div
        className="bg-black opacity-50 w-full h-full absolute"
        onClick={onCancel}
      />
      <div className="w-full h-full flex justify-center items-center">
        <div className="paper-hover bg-white px-4 py-2 relative w-full mx-2 max-w-content">
          <XIcon
            className="h-8 w-8 absolute top-2 right-2 cursor-pointer text-icon"
            onClick={onCancel}
          />
          <h2 className="mb-8">{modal.title}</h2>
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
        </div>
      </div>
    </div>
  );
};
