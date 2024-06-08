import { useState, useEffect } from "react";
import { URL_API } from "../config/constants";
import Header from "../components/Header";
import DashboardLayout from "../layout/DashboardLayout";
import ProductCard from "../components/ProductCard";
import { getTokenFromLocalStorage } from "../utils/functions";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Input from "../components/Input";
import FormCreate from "../components/FormCreate";
import { handleShowModal, handleCloseModal } from "../utils/functions";
import Select from "../components/Select";
function Products() {
  const [products, setProducts] = useState<Array<Object>>([]);
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
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    fetchProducts();
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
              name={product.name}
              category={product.category.name}
              price={product.unitPrice}
            />
          ))}
        </section>
        <Modal onClick={handleCloseModal}>
          <header>
            <h2 className="text-center">Agregar producto</h2>
          </header>
          <FormCreate className="">
            <div className="d-flex flex-column">
              <section>
                <Input
                  type="text"
                  placeholder="Nombre del producto"
                  className="input-text flex-wrap-row"
                  name="name"
                  label="Nombre"
                />
              </section>
              <section>
                <Input
                  type="text"
                  placeholder="Descripcion del producto"
                  className="input-text"
                  name="description"
                  label="Descripcion"
                />
              </section>
              <section>
                <Select
                  options={[{ label: "prueba", value: "0" }]}
                  value="-"
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
                />
                <Input
                  type="currency"
                  placeholder="20.00 mxn"
                  className="input-number"
                  name="unitPrice"
                  label="Precio unitario"
                />
              </section>
              <section className="d-flex gap-10">
                <Input
                  type="number"
                  placeholder="0"
                  className="input-number"
                  name="quantity"
                  label="Cantidad"
                />
                <Input
                  type="text"
                  placeholder="pcs, kg, lts"
                  className="input-text"
                  name="measureUnit"
                  label="Unidad de medida"
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
