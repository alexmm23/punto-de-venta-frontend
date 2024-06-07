import { formatPrice } from "../utils/functions";
export type ProductProps = {
  name: string;
  category: string;
  price: number;
};

function ProductCard({ name, category, price }: ProductProps) {
  return (
    <section className="product-card">
      <h3>Product</h3>
      <p>
        <span>Nombre:</span>&nbsp;{name}
      </p>
      <p>
        <span>Categoria:</span>&nbsp;{category}
      </p>
      <p>
        <span>Precio:</span>&nbsp;{formatPrice(price)}
      </p>
    </section>
  );
}
export default ProductCard;
