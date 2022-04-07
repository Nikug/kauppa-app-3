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
