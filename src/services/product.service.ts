import { PrismaClient } from "@prisma/client";
import ClientError from "../errors/clientError.error";
import { HTTP_STATUS } from "../constants/statusCode.constants";
const prisma = new PrismaClient();
export class ProductService {
  static async getAllProductsPaginated(page: number, pageSize: number) {
    // Obtener productos
    const products = await prisma.products.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      include: {
        ImageProduct: true,
      },
    });

    // Obtener el total de productos y items
    const totalItems = products.length;
    const totalProducts = await prisma.products.count();

    // Calcular el total de páginas
    const totalPages = Math.ceil(totalProducts / pageSize);

    // Calcular nextPage y prevPage
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    // Construir la URL base
    const baseUrl = process.env.BASE_URL + "/product";

    // Construir los enlaces next y prev
    const next = nextPage
      ? `${baseUrl}/products?page=${nextPage}&pageSize=${pageSize}`
      : null;
    const prev = prevPage
      ? `${baseUrl}/products?page=${prevPage}&pageSize=${pageSize}`
      : null;

    return {
      info: {
        count: totalProducts,
        pages: totalPages,
        totalItems,
        next,
        prev,
      },
      results: products,
    };
  }
  static async getProductById(productId: number) {
    const existingProduct = "hola"; /* await prisma.products.findUnique({
          where: {
            id: productId,
          },
        }) */

    if (!existingProduct) {
      throw new ClientError("product not found", HTTP_STATUS.NOT_FOUND);
    }

    return { product: existingProduct };
  }
}
