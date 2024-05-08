import { useEffect, useState } from "react";
import Data from "./Data";
const URL_API = "http://localhost:3010/api";

function Form() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showData, setShowData] = useState<boolean>(false);
  const [products, setProducts] = useState<any>([]);
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
      alert("Login successful");
      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log(data);
      return true;
    } else {
      alert("Login failed: " + response.status);
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
      setProducts(data);
    } else {
      alert("Unauthorized");
    }
  };
  useEffect(() => {
    console.log("Form component mounted");
    const token = localStorage.getItem("token");
    console.log(token);
    if (token != null) {
      setShowData(true);
      fetchProducts();
    } else {
      setShowData(false);
    }
    return () => {
      console.log("Form component unmounted");
    };
  }, [showData]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    login({ email: name, password });
  };

  return (
    <>
      {showData && (
        <section className="products-section">
          {products.map((product: any, index: number) => (
            <Data
              key={index}
              name={product.name}
              category={product.category.name}
              price={product.unitPrice}
            />
          ))}
        </section>
      )}
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input"
          placeholder="Enter your name"
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="password"
          className="form-input"
          placeholder="Enter your password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
export default Form;
