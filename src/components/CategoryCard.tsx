import { Category } from "../types/Category";

function CategoryCard({ category }: { category: Category }) {
  return (
    <article className="product-card text-center">
      <header>
        <h2>{category.name}</h2>
      </header>
      <p>{category.description}</p>
    </article>
  );
}
export default CategoryCard;
