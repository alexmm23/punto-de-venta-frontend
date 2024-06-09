import { FormProps, GenericElementProps, StyleProps } from "../types/General";

function FormCreate({
  children,
  className,
  onSubmit,
}: GenericElementProps & StyleProps & FormProps) {
  return (
    <form method="POST" onSubmit={onSubmit} className={className}>
      {children}
      <button className="mb-20 w-100 btn-submit" type="submit">
        Enviar
      </button>
    </form>
  );
}
export default FormCreate;
