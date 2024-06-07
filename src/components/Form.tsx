import { useEffect, useState } from "react";
import ErrorPill from "./ErrorPill";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/functions";
function Form() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Form component mounted");
    const token = localStorage.getItem("token");
    console.log(token);
    if (token != null) {
      //Redirect to products page
      navigate("/dashboard");
    }
    return () => {
      console.log("Form component unmounted");
    };
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const isAuthorized = await login({ email: name, password });
    if (isAuthorized) {
      setName("");
      setPassword("");
      navigate("/dashboard");
    } else {
      setShowError(true);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input"
          placeholder="Enter your name"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <input
          type="password"
          className="form-input"
          placeholder="Enter your password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        {showError && <ErrorPill message="Login failed!" />}
        <button type="submit">Login</button>
      </form>
    </>
  );
}
export default Form;
