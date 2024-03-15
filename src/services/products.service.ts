import { PrismaClient } from "@prisma/client";
import {
  IProductCreate,
  IProductDelete,
  IProductUpdate,
} from "../types/product.type";
import ClientError from "../errors/clientError.error";
import { HTTP_STATUS } from "../constants/statusCode.constants";
import { CloudinaryService } from "./cloudinary/cloudinary.service";
import fs from "fs-extra";
const prisma = new PrismaClient();
export class ProductsService {
  static async getProductById(productId: number) {
    const existingProduct = await prisma.products.findUnique({
      where: {
        id: productId,
      },
    })
    if(!existingProduct) {
      throw new ClientError("product not found", HTTP_STATUS.NOT_FOUND);
    }
    return {product:existingProduct}
  }
  static async getAllProductsPaginated(page: number, pageSize: number) {
    // Obtener productos
    const products = await prisma.products.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
  
    // Obtener el total de productos y items
    const totalItems= products.length;
    const totalProducts = await prisma.products.count();
    
    // Calcular el total de páginas
    const totalPages = Math.ceil(totalProducts / pageSize);
  
    // Calcular nextPage y prevPage
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;
  
    // Construir la URL base
    const baseUrl = process.env.BASE_URL+"/product";
  
    // Construir los enlaces next y prev
    const next = nextPage ? `${baseUrl}/products?page=${nextPage}&pageSize=${pageSize}` : null;
    const prev = prevPage ? `${baseUrl}/products?page=${prevPage}&pageSize=${pageSize}` : null;
  
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
  static async createProduct(product: IProductCreate) {
    const existsProduct = await prisma.products.findUnique({
      where: {
        name: product.name,
      },
    });

    if (existsProduct) {
      fs.unlink(product.image);
      throw new ClientError("Product already exists", HTTP_STATUS.NOT_FOUND);
    }

    if (!product.image)
      throw new ClientError("image is required", HTTP_STATUS.BAD_REQUEST);

    const result = await CloudinaryService.uploadImg(product.image, undefined);
    fs.unlink(product.image);
    product.image = result.secure_url;

    const newProduct = await prisma.products.create({
      data: {
        ...product,
      },
    });

    return {
      data: newProduct,
      message: "Product created",
    };
  }

  static async updateProduct(product: IProductUpdate) {
    const existsProduct = await prisma.products.findUnique({
      where: {
        id: product.id,
      },
    });
    if (!existsProduct) {
      throw new ClientError("Product not found", HTTP_STATUS.NOT_FOUND);
    }
    if (product.image) {
      console.log("actualizando imagen");
    }
    const updatedProduct = await prisma.products.update({
      where: {
        id: product.id,
      },
      data: {
        ...product,
      },
    });
    return {
      data: updatedProduct,
      message: "Product updated",
    };
  }
  static async deleteProduct(product: IProductDelete) {
    const existsProduct = await prisma.products.findUnique({
      where: {
        id: product.id,
      },
    });
    if (!existsProduct) {
      throw new ClientError("Product not found", HTTP_STATUS.NOT_FOUND);
    }
    const deletedProduct = await prisma.products.delete({
      where: {
        id: product.id,
      },
    });
    return {
      data: deletedProduct,
      message: "Product deleted",
    };
  }
}
