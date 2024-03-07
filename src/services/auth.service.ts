import { PrismaClient } from "@prisma/client";
import { ILogin, Iregister, AuthResult } from "../types/auth.type";
import bcryp from "bcrypt";
import jwt from "jsonwebtoken";
import ClientError from "../errors/clientError.error";
import { HTTP_STATUS } from "../constants/statusCode.constants";

const { ACCESS_SECRET_TOKEN, REFRESH_SECRET_TOKEN } = process.env;

interface User {
  id: number;
  role: string;
}
const prisma = new PrismaClient();
export class AuthService {
  static async register(user: Iregister) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new ClientError("email already in use", HTTP_STATUS.CONFLICT);
    }

    const hashedPassword = await bcryp.hash(user.password, 10);

    const newUser = await prisma.user.create({
      data: { ...user, password: hashedPassword },
      select: { id: true, role: true },
    });

    return await this.generateAuthTokens(newUser, "register success");
  }
  static async login(user: ILogin) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
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
    const { id, role } = existingUser;
    return await this.generateAuthTokens({ id, role }, "login success");
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
          createAt:new Date(Date.now())
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
}
