import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class UserService {
  static async createUser() {}
  static async updateUser() {}
  static async deleteUser() {}
  static async getUser() {}
  static async getAllUsers(page: number, pageSize: number) {
    const users = await prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalItems = users.length;
    const totalUsers = await prisma.user.count();

    const totalPages = Math.ceil(totalUsers / pageSize);

    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    const baseUrl = `${process.env.BASE_URL}/user/users`;
    const next = nextPage
      ? `${baseUrl}?page=${nextPage}&pageSize=${pageSize}`
      : null;
    const prev = prevPage
      ? `${baseUrl}?page=${prevPage}&pageSize=${pageSize}`
      : null;
    return {
      info: {
        count: totalUsers,
        pages: totalPages,
        totalItems,
        next,
        prev,
      },
      results: users,
    };
  }
}
