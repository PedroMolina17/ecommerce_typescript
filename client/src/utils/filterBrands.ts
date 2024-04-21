import { IBrand } from "../types/brands.type";

export const filterBrandByName = (data: IBrand[], value: string) => {
  return data.filter((brand) =>
    brand.name.toLowerCase().includes(value.toLowerCase()),
  );
};
