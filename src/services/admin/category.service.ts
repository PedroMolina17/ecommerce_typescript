import { PrismaClient } from "@prisma/client";
export class CategoryService {
  constructor(private readonly prisma: PrismaClient) {}
  async createCategory() {}
  async updateCategory() {}
  async deleteCategory() {}
}
