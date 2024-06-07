import { useState, useEffect } from "react";
import { URL_API } from "../config/constants";
import Header from "../components/Header";
import DashboardLayout from "../layout/DashboardLayout";
import ProductCard from "../components/ProductCard";
import { getTokenFromLocalStorage } from "../utils/functions";
import { useNavigate } from "react-router-dom";
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
      </section>
    </DashboardLayout>
  );
}
export default Products;
