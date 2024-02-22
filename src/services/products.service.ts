import { PrismaClient } from "@prisma/client";
import { IProductCreate, IProductDelete, IProductUpdate } from "../types/product.type";
import ClientError from "../errors/clientError.error";
import { HTTP_STATUS } from "../constants/statusCode.constants";
const prisma = new PrismaClient()
export class ProductsService {
    // Add your product-related service methods here
    static async createProduct(product:IProductCreate) {
        // Logic to create a new product
        const existsProduct = await prisma.products.findUnique({
            where: {
                name: product.name
            }
        })
        if(existsProduct){
            throw new ClientError("Product already exists", HTTP_STATUS.NOT_FOUND)
        }
        if(product.image){
             console.log("upload Image")
        }
        const newProduct = await prisma.products.create({
            data: {
                ...product
            }
        })

        return {
            data: newProduct,
            message: "Product created"
        }

    }

    static async updateProduct(product:IProductUpdate) {
        const existsProduct = await prisma.products.findUnique({
            where: {
                id: product.id
            }
        })
        if(!existsProduct){
            throw new ClientError("Product not found", HTTP_STATUS.NOT_FOUND)
        }
        if(product.image){
            console.log("actualizando imagen")
        }
        const updatedProduct = await prisma.products.update({
            where: {
                id: product.id
            },
            data: {
                ...product
            }
        })
        return {
            data: updatedProduct,
            message: "Product updated"
        }
    }
    static async deleteProduct(product:IProductDelete) {
        const existsProduct = await prisma.products.findUnique({
            where: {
                id: product.id
            }
        })
        if(!existsProduct){
            throw new ClientError("Product not found", HTTP_STATUS.NOT_FOUND)
        }
        const deletedProduct = await prisma.products.delete({
            where: {
                id: product.id
            }
        })
        return {
            data: deletedProduct,
            message: "Product deleted"
        }
    }
}

