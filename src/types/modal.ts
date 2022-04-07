import { Dispatch } from "react";

export interface EditModal {
  uid: string;
  title: string;
  subtitle?: string;
  value?: string;
  okButtonText?: string;
  cancelButtonText?: string;
  onOk?(value: string): void;
  onCancel?(): void;
}

export interface ModalAction<T> {
  type: "create" | "remove";
  payload: T;
}

export interface ModalContextState {
  modals: EditModal[];
  dispatch: Dispatch<ModalAction<unknown>>;
}
