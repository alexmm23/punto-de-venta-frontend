import { useEffect, useState } from "react";
import Data from "./Data";
const URL_API = "http://localhost:3010/api";

function Form() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showData, setShowData] = useState<boolean>(false);
  const [products, setProducts] = useState<Array<Object>>([]);
  const [categories, setCategories] = useState<Array<Object>>([]);
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
  const fetchCategories = async () => {
    const response = await fetch(`${URL_API}/v1/categories/getNames`, {
      method: "GET",
    });
    if (response.status === 200) {
      const data = await response.json();
      setCategories(data);
    } else {
      alert("Categories not found");
    }
  };

  useEffect(() => {
    console.log("Form component mounted");
    const token = localStorage.getItem("token");
    console.log(token);
    fetchCategories();
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
    const isAuthorized = await login({ email: name, password });
    if (isAuthorized) {
      setShowData(true);
      setName("");
      setPassword("");
      console.log(name, password);
    }
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
      <h3>Categorías (Endpoint desprotegido)</h3>
      <section className="categories-section">
        <ul className="categories-list">
          {categories.map((category: any, index: number) => (
            <li key={index}>
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </li>
          ))}
        </ul>
      </section>

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
        <button type="submit">Login</button>
      </form>
    </>
  );
}
export default Form;
