import { InputProps, StyleProps } from "../types/General";
import { useState } from "react";
export function Input({
  type,
  placeholder,
  value,
  name,
  className,
  label,
}: InputProps & StyleProps) {
  const [inputValue, setInputValue] = useState<string>(value ? value : "");
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (type === "currency") {
      value = value.replace(/[^0-9.]/g, "");
    }
    setInputValue(value);
  };
  return (
    <div className={type === "currency" ? "w-80" : "w-100"}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
      )}
      <article className="d-flex space-between align-center w-100">
        {type === "currency" && (
          <span className=" currency">
            <b>$</b>
          </span>
        )}
        <input
          id={name}
          className={`input ${className}`}
          type={type}
          placeholder={placeholder}
          value={inputValue}
          name={name}
          onChange={handleOnChange}
          autoComplete="on"
          {...((type === "number" || type === "currency") && { min: 0 })}
        />
        {type === "currency" && (
          <span className="currency text-center">
            <i>
              <small>MXN</small>
            </i>
          </span>
        )}
      </article>
      <p className="warning-feedback mb-20">
        {inputValue === ""
          ? "El campo: " + (label ?? name) + " es requerido"
          : ""}
      </p>
    </div>
  );
}
export default Input;
