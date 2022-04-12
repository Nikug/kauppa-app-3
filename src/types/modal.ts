import { Dispatch } from "react";

export interface Modal {
  type: "confirmation" | "edit" | "addUser";
  uid: string;
  title?: string;
  okButtonText?: string;
  cancelButtonText?: string;
  onCancel?(): void;
}

export interface ConfirmationModal extends Modal {
  type: "confirmation";
  onOk?(): void;
}

export interface EditModal extends Modal {
  type: "edit";
  label?: string;
  value?: string;
  onOk?(value: string): void;
}

export interface AddUserModal extends Modal {
  type: "addUser";
  label?: string;
  value?: string;
  collectionId: string;
}

export interface ModalAction<T> {
  type: "create" | "remove";
  payload: T;
}

export interface ModalContextState {
  modals: Modal[];
  dispatch: Dispatch<ModalAction<unknown>>;
}
