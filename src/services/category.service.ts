import { PrismaClient } from "@prisma/client";
import {
  ICreateCategory,
  IDeleteCategory,
  IUpdateCategory,
} from "../types/category.type";
import ClientError from "../errors/clientError.error";
import { HTTP_STATUS } from "../constants/statusCode.constants";
const prisma = new PrismaClient();
export class categoryService {
  static async getCategory() {
    const categories = await prisma.category.findMany();
    return { data: categories };
  }
  static async createCategory(category: ICreateCategory) {
    const categoryExists = await prisma.category.findUnique({
      where: { name: category.name },
    });
    if (categoryExists) {
      throw new ClientError(
        `already exists a category with name ${category.name}, please use another name`,
        HTTP_STATUS.CONFLICT,
      );
    }

    const newCategory = await prisma.category.create({
      data: { name: category.name },
    });

    return { message: "category created", data: newCategory };
  }

  static async updateCategory(category: IUpdateCategory) {
    const existsCategory = await prisma.category.findUnique({
      where: { name: category.name },
    });
    if (existsCategory) {
      throw new ClientError("category already exists", HTTP_STATUS.CONFLICT);
    }
    const updatedCategory = await prisma.category.update({
      where: { id: category.id },
      data: { name: category.name },
    });
    return {
      data: updatedCategory,
      message: "category updated",
    };
  }

  static async deleteCategory(category: IDeleteCategory) {
    // Logic to delete a category

    const data = await prisma.category.delete({
      where: { id: category.id },
    });
    return {
      data,
      message: "category deleted",
    };
  }
}
