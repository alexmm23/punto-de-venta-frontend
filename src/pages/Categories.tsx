import Header from "../components/Header";
import { URL_API } from "../config/constants";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import CategoryCard from "../components/CategoryCard";
import { Category } from "../types/Category";
import { getTokenFromLocalStorage } from "../utils/functions";
function Categories() {
  const [categories, setCategories] = useState<Array<Category>>([]);
  const navigate = useNavigate();
  const token = getTokenFromLocalStorage();
  const fetchCategories = async () => {
    const response = await fetch(`${URL_API}/v1/categories/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      setCategories(data);
    }
  };
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    fetchCategories();
  }, []);
  return (
    <DashboardLayout>
      <Header title="Categories" />
      <section className="row">
        {categories.map((category: Category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </section>
    </DashboardLayout>
  );
}

export default Categories;
