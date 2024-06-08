import { GenericElementFunctionProps } from "../types/General";
function Modal({ children, onClick }: GenericElementFunctionProps) {
  return (
    <section className="modal">
      <section className="modal-content">
        <span className="close-btn" onClick={onClick}>
          &times;
        </span>
        {children}
      </section>
    </section>
  );
}
export default Modal;
