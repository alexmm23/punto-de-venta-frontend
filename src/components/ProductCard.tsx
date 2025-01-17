import { formatPrice } from "../utils/functions";
import { ProductProps } from "../types/Product";
function ProductCard({
  _id,
  name,
  category,
  price,
  onDelete,
  onEdit,
}: ProductProps) {
  return (
    <section className="product-card">
      <h3>Product</h3>
      <p>
        <span>Nombre:</span>&nbsp;{name ? name : "Sin categoria"}
      </p>
      <p>
        <span>Categoria:</span>&nbsp;
        {category ? category : "Sin categoria"}
      </p>
      <p>
        <span>Precio:</span>&nbsp;{formatPrice(price ? price : 0)}
      </p>
      <div className="d-flex space-between">
        <button onClick={() => onEdit(_id)}>Editar</button>
        <button className="btn-delete" onClick={() => onDelete(_id)}>
          Eliminar
        </button>
      </div>
    </section>
  );
}
export default ProductCard;
