import { useTranslation } from "react-i18next";
import { useModalContext } from "../../contexts/ModalContextProvider";
import { ConfirmationModal as ConfirmationModalType } from "../../types/modal";
import { Button } from "../inputs/Button";
import { ModalBody } from "./ModalBody";

interface Props {
  modal: ConfirmationModalType;
}

export const ConfirmationModal = (props: Props) => {
  const { t } = useTranslation();
  const { modal } = props;
  const { dispatch } = useModalContext();

  const closeModal = () => dispatch({ type: "remove", payload: modal.uid });

  const onSubmit = () => {
    closeModal();
    if (modal.onOk) modal.onOk();
  };

  const onCancel = () => {
    closeModal();
    if (modal.onCancel) modal.onCancel();
  };

  return (
    <ModalBody onClose={onCancel} title={modal.title}>
      <div className="flex mt-4 justify-end gap-x-8">
        <Button onClick={onCancel} className="secondary">
          {modal.cancelButtonText ?? t("modal.cancel")}
        </Button>
        <Button className="primary" onClick={onSubmit}>
          {modal.okButtonText ?? t("modal.ok")}
        </Button>
      </div>
    </ModalBody>
  );
};
