import { PrismaClient } from "@prisma/client";
import { IUpdateUserById, IUserByNamePaginate } from "../types/user.type";
import { EmailUser, IdUser } from "../types/types";
import ClientError from "../errors/clientError.error";
import { HTTP_STATUS } from "../constants/statusCode.constants";
import { CloudinaryService } from "./cloudinary/cloudinary.service";
// import fs from "fs-extra";
// import { optimizeImage } from "../utils/optimizeImage.util";

interface UserData {
  [key: string]: any; // Define the index signature for acc
}

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

  static async getUserById(id: IdUser) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  static async getAdminById(id: IdUser) {
    const user = await prisma.admin.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  static async getUserByEmail(email: EmailUser) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  static async deleteUserById(id: IdUser) {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    return { message: `user ${user.userName} deleted` };
  }

  static async updateUserById(
    id: IdUser,
    userData: IUpdateUserById,
  ): Promise<{ message: string }> {
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new ClientError("user not found", HTTP_STATUS.NOT_FOUND);
    }

    const filteredUserData = Object.entries(userData).reduce(
      (acc: UserData, [key, value]) => {
        if (value !== undefined && value !== "" && value !== null) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );
    if (filteredUserData.image && existingUser.image === null) {
      /* const { public_id, secure_url } =
        await CloudinaryService.uploadImage(
          filteredUserData.image,
          undefined
        );
      filteredUserData.image = secure_url;
      filteredUserData.publicIdImage = public_id; */
      console.log("----->>>>> image no existe");
    }
    if (filteredUserData.image && existingUser.image !== null) {
      /* const { secure_url, public_id } =
        await CloudinaryService.uploadImage(
          filteredUserData.image,
          existingUser.publicIdImage!
        );
      filteredUserData.image = secure_url;
      filteredUserData.publicIdImage = public_id; */
      console.log("----->>>>> image existe");
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: filteredUserData,
    });

    return {
      message: `user updated successfully`,
    };
  }

  static async getUserByName(data: IUserByNamePaginate) {
    const searchTerm = data.userName.toLowerCase(); // Ensure case-insensitive search

    const users = await prisma.user.findMany({
      skip: (data.page - 1) * data.pageSize,
      take: data.pageSize,
      where: {
        userName: {
          contains: searchTerm, // Perform case-insensitive search using 'contains'
        },
      },
    });

    const totalUsers = await prisma.user.count({
      where: {
        userName: {
          contains: searchTerm,
        },
      },
    });

    const totalPages = Math.ceil(totalUsers / data.pageSize);

    const nextPage = data.page < totalPages ? data.page + 1 : null;
    const prevPage = data.page > 1 ? data.page - 1 : null;

    const baseUrl = `${process.env.BASE_URL}/user/users/${data.userName}`;
    const next = nextPage
      ? `${baseUrl}?page=${nextPage}&pageSize=${data.pageSize}`
      : null;
    const prev = prevPage
      ? `${baseUrl}?page=${prevPage}&pageSize=${data.pageSize}`
      : null;

    return {
      info: {
        count: totalUsers,
        pages: totalPages,
        totalItems: users.length, // Reflect the actual number of filtered users
        next,
        prev,
      },
      results: users,
    };
  }
}
