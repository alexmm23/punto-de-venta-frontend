import { useState, useEffect } from "react";
import { URL_API } from "../config/constants";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
function Products() {
  const [products, setProducts] = useState<Array<Object>>([]);

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
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section>
      <Header title="Products" />
      {products.map((product: any) => (
        <ProductCard
          key={product._id}
          name={product.name}
          category={product.category}
          price={product.price}
        />
      ))}
    </section>
  );
}
export default Products;
