export const parseProduct = (product: any) => {
  console.log("parseProduct--->>>", product);
  for (const key in product) {
    if (typeof product[key] === "string") {
      product[key] = product[key].trim();
    }
    if (
      key === "brandId" ||
      key === "categoryId" ||
      key === "stock" ||
      key === "purchasePrice" ||
      key === "salePrice" ||
      key === "promotionPrice"
    ) {
      product[key] = Number(product[key]);
    }
    if (key === "active" || key === "promotion" || key === "status") {
      product[key] = product[key] === "true" ? true : false;
    }
  }
  return product;
};
