import { GenericElementProps, StyleProps } from "../types/General";
import { postData } from "../utils/functions";
import { validateForm } from "../utils/functions";
import { useState } from "react";

function FormCreate({ children, className }: GenericElementProps & StyleProps) {
  const [error, setError] = useState<boolean>(false);
  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(false);
    //Get all the data from children in the form
    const form = document.querySelector("form") as HTMLFormElement;
    const entries = new FormData(form).entries() as any;
    const data = Object.fromEntries(entries);
    const isValid = validateForm(data);
    if (!isValid) {
      setError(true);
      return;
    }
    //Send the data to the server
    const response = await postData(data, "products");
    if (response.status === 200) {
      //Render all the products updated
      window.location.reload();
    } else {
      setError(true);
    }
  };
  return (
    <form method="POST" onSubmit={handleOnSubmit} className={className}>
      {error && (
        <p className="invalid-feedback text-center">
          Todos los campos son requeridos
        </p>
      )}
      {children}
      <button className="mb-20 w-100 btn-submit" type="submit">
        Enviar
      </button>
    </form>
  );
}
export default FormCreate;
