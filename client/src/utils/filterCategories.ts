import { ICategory } from "../types/category.type";

export const filterCategoriesByName = (data: ICategory[], value: string) => {
  return data.filter((category) =>
    category.name.toLowerCase().includes(value.toLowerCase()),
  );
};
