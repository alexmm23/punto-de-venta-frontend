export type ProductProps = {
  name: string;
  category: string;
  price: number;
};
function ProductCard({ name, category, price }: ProductProps) {
  return (
    <section className="product-card">
      <p>
        <span>Nombre:</span>&nbsp;{name}
      </p>
      <p>
        <span>Categoria:</span>&nbsp;{category}
      </p>
      <p>
        <span>Precio:</span>&nbsp;{price}
      </p>
    </section>
  );
}
export default ProductCard;
