import { Category } from "../types/Category";

function CategoryCard({
  category,
  onEdit,
  onDelete,
}: {
  category: Category;
  onEdit: (_id: string) => void;
  onDelete: (_id: string) => void;
}) {
  return (
    <article className="product-card text-center">
      <header>
        <h2>{category.name}</h2>
      </header>
      <p>{category.description}</p>
      <div className="d-flex space-between">
        <button onClick={() => onEdit(category._id)} className="btn-edit">
          Editar
        </button>
        <button onClick={() => onDelete(category._id)} className="btn-delete">
          Delete
        </button>
      </div>
    </article>
  );
}
export default CategoryCard;
