import Header from "../components/Header";
import { URL_API } from "../config/constants";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import CategoryCard from "../components/CategoryCard";
import { Category } from "../types/Category";
import Input from "../components/Input";
import {
  getTokenFromLocalStorage,
  handleCloseModal,
  handleShowModal,
  postData,
} from "../utils/functions";
import Modal from "../components/Modal";
import FormCreate from "../components/FormCreate";
function Categories() {
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
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
  const handleDeleteCategory = async (_id: string) => {
    const response = await fetch(`${URL_API}/v1/categories/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      setCategories(categories.filter((Category) => Category._id !== _id));
    }
  };

  const handleEditCategory = (_id: string) => {
    const category = categories.find((p) => p._id === _id);
    console.log(category);
    if (!category) return console.log("Category not found");
    setEditCategory(category);
    handleShowModal();
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = document.querySelector("form") as HTMLFormElement;
    const entries = new FormData(form).entries();
    const requestBody = Object.fromEntries(entries);
    const endpoint = editCategory
      ? `categories/${editCategory._id}`
      : "categories";
    const method = editCategory ? "PUT" : "POST";
    const response = await postData(requestBody, endpoint, method);
    if (response) {
      const newCategory = response;
      if (editCategory) {
        setCategories(
          categories.map(
            (p): Category => (p._id === newCategory._id ? newCategory : p)
          )
        );
        setEditCategory(null);
      } else {
        setCategories([...categories, newCategory]);
      }
    }
    handleCloseModal();
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
      <button onClick={handleShowModal}>Nuevo</button>
      <section className="row">
        {categories.map((category: Category) => (
          <CategoryCard
            key={category._id}
            category={category}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        ))}
      </section>
      <Modal onClick={handleCloseModal}>
        <FormCreate className="" onSubmit={handleSubmit}>
          <h2>{editCategory ? "Editar categoría" : "Crear categoría"}</h2>
          <Input
            className="input-text"
            type="text"
            name="name"
            placeholder="Nombre"
            value={editCategory ? editCategory.name : ""}
          />
          <Input
            className="input-text"
            type="text"
            name="description"
            placeholder="Descripción"
            value={editCategory ? editCategory.description : ""}
          />
        </FormCreate>
      </Modal>
    </DashboardLayout>
  );
}

export default Categories;
