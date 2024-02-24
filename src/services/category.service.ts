import { PrismaClient } from "@prisma/client";
import { Icategory } from "../types/category.type";
import ClientError from "../errors/clientError.error";
import { HTTP_STATUS } from "../constants/statusCode.constants";
const prisma = new PrismaClient();
export class categoryService {

static async getCategory(){

  const categories = await prisma.category.findMany();
  return  {data:categories}
}
  static async createCategory(category: Icategory) {

    const categoryExists = await prisma.category.findUnique({
      where: { name: category.name },
    })
    if (categoryExists) {
      throw new ClientError(
        `already exists a category with name ${category.name}, please use another name`,
        HTTP_STATUS.CONFLICT
      );
    }

    const newCategory = await prisma.category.create({
      data: { name:category.name },
    });

    return { message: "category created" };
  }

  static async updateCategory(category: Icategory) {
    // Logic to update a category
    const updatedCategory = await prisma.category.update({
      where: { id:category.id},
      data: { name: category.name },
    });
    return {
      message: "category updated",
    };
  }

  static async deleteCategory(category: Icategory) {
    // Logic to delete a category
    await prisma.category.delete({
        where: { id:category.id },
    });
    return {
      message: "category deleted",
    }
  }
}
