import { Category } from "./Category";
export type ProductProps = {
  _id: string;
  name: string;
  category: string;
  price: number;
  onEdit: (_id: string) => void;
  onDelete: (_id: string) => void;
};
export type Product = {
  _id: string;
  name: string;
  unitCost: number;
  unitPrice: number;
  quantity: number;
  updateAt: string;
  createdAt: string;
  measureUnit: string;
  category: Category;
  description: string;
};
