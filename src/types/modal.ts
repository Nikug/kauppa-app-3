import { Dispatch } from "react";

export interface Modal {
  type: "confirmation" | "edit";
  uid: string;
  title?: string;
  okButtonText?: string;
  cancelButtonText?: string;
  onCancel?(): void;
}

export interface ConfirmationModal extends Modal {
  onOk?(): void;
}

export interface EditModal extends Omit<Modal, "onOk"> {
  label?: string;
  value?: string;
  onOk?(value: string): void;
}

export interface ModalAction<T> {
  type: "create" | "remove";
  payload: T;
}

export interface ModalContextState {
  modals: Modal[];
  dispatch: Dispatch<ModalAction<unknown>>;
}
