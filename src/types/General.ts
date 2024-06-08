export type GenericElementProps = {
  children: React.ReactNode;
};
export type GenericElementFunctionProps = {
  children: React.ReactNode;
  onClick: () => void;
};
export type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};
export type FormProps = {
  onSubmit?: (e: React.FormEvent) => void;
};
export type InputProps = {
  type: string;
  placeholder: string;
  value?: string;
  name: string;
  id?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export type StyleProps = {
  className: string;
};
export type SelectProps = {
  options: { value: string; label: string }[];
  value: string;
  name: string;
  label?: string;
};
