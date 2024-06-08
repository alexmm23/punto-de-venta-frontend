import { SelectProps } from "../types/General";
import { useState, useEffect } from "react";

function Select({ options, value, name, label }: SelectProps) {
  const [inputValue, setInputValue] = useState<string>(value ? value : "-1");
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setInputValue(value);
    console.log(value);
  };
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  return (
    <>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
      )}
      <select
        name={name}
        id={name}
        className="select"
        onChange={handleOnChange}
        defaultValue={inputValue}
      >
        <option value="-1">--Selecciona una opcion--</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p className="warning-feedback mb-20">
        {inputValue === "-1"
          ? "El campo: " + (label ?? name) + " es requerido"
          : ""}
      </p>
    </>
  );
}
export default Select;
