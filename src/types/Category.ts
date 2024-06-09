export type Category = {
  _id: string;
  name: string;
  description: string;
};
export type CategoryProps = Category & {
  key: string;
};
