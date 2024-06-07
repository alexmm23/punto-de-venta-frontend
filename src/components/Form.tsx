import { useEffect, useState } from "react";
import { URL_API } from "../config/constants";
import ErrorPill from "./ErrorPill";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
function Form() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const navigate = useNavigate();
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await fetch(`${URL_API}/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.status === 200) {
      //alert("Login successful");
      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log(data);
      return true;
    }
    return false;
  };
  const fetchProducts = async () => {
    const response = await fetch(`${URL_API}/v1/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      // setProducts(data);
    } else {
      alert("Unauthorized");
    }
  };
  const fetchCategories = async () => {
    const response = await fetch(`${URL_API}/v1/categories/getNames`, {
      method: "GET",
    });
    if (response.status === 200) {
      const data = await response.json();
      //setCategories(data);
    } else {
      alert("Categories not found");
    }
  };

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
