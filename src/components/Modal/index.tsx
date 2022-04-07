import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { removeEditModal } from "../../redux/modalSlice";
import { EditModal } from "../../types/modal";
import { Button } from "../inputs/Button";
import { SubmitButton } from "../inputs/SubmitButton";
import { TextInput } from "../inputs/TextInput";

interface Props {
  modal: EditModal;
}

export const Modal = (props: Props) => {
  const { modal } = props;
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: { value: modal.value },
  });

  const onSubmit = (data: { value: string | undefined }) => {
    console.log(data.value);
    dispatch(removeEditModal(modal.uid));
    if (modal.onOk) modal.onOk(data.value ?? "");
  };

  const onCancel = () => {
    dispatch(removeEditModal(modal.uid));
    if (modal.onCancel) modal.onCancel();
  };

  return (
    <div>
      <div className="fixed inset-0 z-10 bg-black opacity-50">
        <div className="inset-0 flex justify-center items-center">
          <div className="paper-hover mx-8">
            <h2>{modal.title}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextInput {...register("value")} />
              <div className="flex">
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
    </div>
  );
};
