import { useState, useEffect } from "react";
import { URL_API } from "../config/constants";
import Header from "../components/Header";
import DashboardLayout from "../layout/DashboardLayout";
import ProductCard from "../components/ProductCard";
import { getTokenFromLocalStorage, postData } from "../utils/functions";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Input from "../components/Input";
import FormCreate from "../components/FormCreate";
import { handleShowModal, handleCloseModal } from "../utils/functions";
import Select from "../components/Select";
import { Option } from "../types/General";
import { Product } from "../types/Product";
function Products() {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [categories, setCategories] = useState<Array<Option>>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const token = getTokenFromLocalStorage();

  const navigate = useNavigate();
  const fetchProducts = async () => {
    const response = await fetch(`${URL_API}/v1/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      setProducts(data);
    }
  };
  const fetchCategories = async () => {
    const response = await fetch(`${URL_API}/v1/categories/getNames`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      const options = data.map((category: any) => {
        return {
          label: category.name,
          value: category.name,
        };
      });
      setCategories(options);
    }
  };
  const handleDeleteProduct = async (_id: string) => {
    const response = await fetch(`${URL_API}/v1/products/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      setProducts(products.filter((product) => product._id !== _id));
    }
  };

  const handleEditProduct = (_id: string) => {
    const product = products.find((p) => p._id === _id);
    console.log(product);
    if (!product) return console.log("Product not found");
    setEditProduct(product);
    handleShowModal();
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    fetchProducts();
    fetchCategories();
  }, []);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = document.querySelector("form") as HTMLFormElement;
    const entries = new FormData(form).entries();
    const requestBody = Object.fromEntries(entries);
    const endpoint = editProduct ? `products/${editProduct._id}` : "products";
    const method = editProduct ? "PUT" : "POST";
    const response = await postData(requestBody, endpoint, method);
    if (response) {
      const newProduct = response;
      if (editProduct) {
        setProducts(
          products.map(
            (p): Product => (p._id === newProduct._id ? newProduct : p)
          )
        );
        setEditProduct(null);
      } else {
        setProducts([...products, newProduct]);
      }
    }
    handleCloseModal();
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    fetchProducts();
    fetchCategories();
  }, []);
  return (
    <DashboardLayout>
      <section className="section-center">
        <Header title="Products" />
        <section>
          <button onClick={handleShowModal}>Nuevo</button>
        </section>
        <section className="row">
          {products.map((product: any) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              name={product.name}
              category={product.category.name}
              price={product.unitPrice}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          ))}
        </section>
        <Modal onClick={handleCloseModal}>
          <header>
            <h2 className="text-center">
              {editProduct ? "Editar Producto" : "Agregar Producto"}
            </h2>
          </header>
          <FormCreate className="" onSubmit={handleSubmit}>
            <div className="d-flex flex-column">
              <section>
                <Input
                  type="text"
                  placeholder="Nombre del producto"
                  className="input-text flex-wrap-row"
                  name="name"
                  label="Nombre"
                  value={editProduct ? editProduct.name : ""}
                />
              </section>
              <section>
                <Input
                  type="text"
                  placeholder="Descripcion del producto"
                  className="input-text"
                  name="description"
                  label="Descripcion"
                  value={editProduct ? editProduct.description : ""}
                />
              </section>
              <section>
                <Select
                  options={categories}
                  value={editProduct ? editProduct.category.name : ""}
                  label="Categoria"
                  name="category"
                />
              </section>
              <section className="d-flex gap-10">
                <Input
                  type="currency"
                  placeholder="20.00 mxn"
                  className="input-number"
                  name="unitCost"
                  label="Costo unitario"
                  value={editProduct ? editProduct.unitCost.toString() : ""}
                />
                <Input
                  type="currency"
                  placeholder="20.00 mxn"
                  className="input-number"
                  name="unitPrice"
                  label="Precio unitario"
                  value={editProduct ? editProduct.unitPrice.toString() : ""}
                />
              </section>
              <section className="d-flex gap-10">
                <Input
                  type="number"
                  placeholder="0"
                  className="input-number"
                  name="quantity"
                  label="Cantidad"
                  value={editProduct ? editProduct.quantity.toString() : ""}
                />
                <Input
                  type="text"
                  placeholder="pcs, kg, lts"
                  className="input-text"
                  name="measureUnit"
                  label="Unidad de medida"
                  value={editProduct ? editProduct.measureUnit : ""}
                />
              </section>
            </div>
          </FormCreate>
        </Modal>
      </section>
    </DashboardLayout>
  );
}
export default Products;
