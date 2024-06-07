import Header from "../components/Header";
import { URL_API } from "../config/constants";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Categories() {
  const [categories, setCategories] = useState<Array<Object>>([]);
  const navigate = useNavigate();
  const fetchCategories = async () => {
    const response = await fetch(`${URL_API}/v1/categories/getNames`, {
      method: "GET",
    });
    if (response.status === 200) {
      const data = await response.json();
      setCategories(data);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    fetchCategories();
  }, []);
  return (
    <section>
      <Header title="Categories" />
      {/* {categories.map((category: any) => (
        <CategoryCard
          key={category.id}
          name={category.name}
          description={category.description}
        />
      ))} */}
    </section>
  );
}

export default Categories;
