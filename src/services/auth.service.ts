import { PrismaClient } from "@prisma/client";
import {
  ILoginUser,
  IRegisterUser,
  AuthResult,
  User,
  IRegisterAdmin,
  ILoginAdmin,
  DecodeTokenAdmin,
} from "../types/auth.type";
import bcryp from "bcrypt";
import jwt from "jsonwebtoken";
import ClientError from "../errors/clientError.error";
import { HTTP_STATUS } from "../constants/statusCode.constants";

const { ACCESS_SECRET_TOKEN, REFRESH_SECRET_TOKEN } = process.env;

const prisma = new PrismaClient();
export class AuthService {
  static async registerAdmin(user: IRegisterAdmin) {
    const existingUser = await prisma.admin.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new ClientError("email already in use", HTTP_STATUS.CONFLICT);
    }

    const hashedPassword = await bcryp.hash(user.password, 10);
    const newUser = await prisma.admin.create({
      data: { ...user, password: hashedPassword },
      select: { id: true, role: true },
    });
    const accessToken = jwt.sign({ user: newUser }, ACCESS_SECRET_TOKEN!, {
      expiresIn: "24h",
    });
    const refreshToken = jwt.sign({ user: newUser }, REFRESH_SECRET_TOKEN!, {
      expiresIn: "7d",
    });

    await prisma.token.create({
      data: {
        adminId: newUser.id,
        token: refreshToken,
        expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
    return { accessToken, refreshToken, message: "register success" };
  }
  static async loginAdmin(user: ILoginAdmin) {
    const existingUser = await prisma.admin.findUnique({
      where: { email: user.email },
      select: { id: true, password: true, role: true },
    });

    if (!existingUser) {
      throw new ClientError("user not found", HTTP_STATUS.NOT_FOUND);
    }

    const isPasswordValid = await bcryp.compare(
      user.password,
      existingUser.password!
    );

    if (!isPasswordValid) {
      throw new ClientError("password not valid", HTTP_STATUS.UNAUTHORIZED);
    }

    const accessToken = jwt.sign(
      { user: { id: existingUser.id, role: existingUser.role } },
      ACCESS_SECRET_TOKEN!,
      {
        expiresIn: "24h",
      }
    );
    const refreshToken = jwt.sign(
      { user: { id: existingUser.id, role: existingUser.role } },
      REFRESH_SECRET_TOKEN!,
      {
        expiresIn: "7d",
      }
    );
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const existingToken = await prisma.token.findFirst({
      where: {
        adminId: existingUser.id,
      },
    });
    if (existingToken) {
      await prisma.token.update({
        where: { id: existingToken.id },
        data: {
          token: refreshToken,
          expiredAt,
          createAt: new Date(Date.now()),
        },
      });
      return { accessToken, refreshToken, message: "login success" };
    }

    await prisma.token.create({
      data: {
        adminId: existingUser.id,
        token: refreshToken,
        expiredAt,
      },
    });

    return { accessToken, refreshToken, message: "login success" };
  }

  static async logoutAdmin(user: User) {
    console.log("----->>>>>>>", user);
    await prisma.token.delete({
      where: { adminId: user.id },
    });
    return { message: "logout success" };
  }

  /*------------------- auth user(cliente) -----------*/
  static async register(user: IRegisterUser) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new ClientError("email already in use", HTTP_STATUS.CONFLICT);
    }

    const hashedPassword = await bcryp.hash(user.password, 10);

    const newUser = await prisma.user.create({
      data: { ...user, password: hashedPassword },
      select: { id: true },
    });

    return await this.generateAuthTokens(newUser, "register success");
  }

  static async login(user: ILoginUser) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
      select: { id: true, password: true, userName: true },
    });

    if (!existingUser) {
      throw new ClientError("user not found", HTTP_STATUS.NOT_FOUND);
    }
    const isPasswordValid = await bcryp.compare(
      user.password,
      existingUser.password!
    );

    if (!isPasswordValid) {
      throw new ClientError("password not valid", HTTP_STATUS.UNAUTHORIZED);
    }
    const { id, userName } = existingUser;
    return await this.generateAuthTokens({ id, userName }, "login success");
  }

  private static async generateAuthTokens(user: User, message: string) {
    const accessToken = jwt.sign({ user }, ACCESS_SECRET_TOKEN!, {
      expiresIn: "24h",
    });

    const refreshToken = jwt.sign({ user }, REFRESH_SECRET_TOKEN!, {
      expiresIn: "7d",
    });
    //verifica si el refres token existe en la base de datos
    const existingToken = await prisma.token.findFirst({
      where: { userId: user.id },
    });
    //actualiza el refresh token
    if (existingToken) {
      await prisma.token.update({
        where: { id: existingToken.id },
        data: {
          token: refreshToken,
          expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          createAt: new Date(Date.now()),
        },
      });
      return { accessToken, refreshToken, message };
    }

    await prisma.token.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { accessToken, refreshToken, message };
  }

  static async logout(user: User) {
    console.log("----->>>>>>>", user);
    const deleteToken = await prisma.token.delete({
      where: { userId: user.id },
      select: { user: true },
    });
    return deleteToken;
  }

  static async checkAuth() {
    return await prisma.user.findMany();
  }
}
