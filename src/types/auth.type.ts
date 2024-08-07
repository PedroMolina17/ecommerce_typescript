export enum userRole {
  admin = "admin",
}
export interface IRegisterUser {
  userName: string;
  email: string;
  password: string;
}
export interface IRegisterAdmin extends IRegisterUser {}
export interface ILoginAdmin extends ILoginUser {}
export interface ILoginUser {
  email: string;
  password: string;
  userName?: string;
}

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  message: string;
}
export interface DecodedTokenUser {
  user: User;
  iat: number;
  exp: number;
}
export interface User {
  id: number;
  userName?: string;
}
export interface DecodeTokenAdmin {
  user: UserAdmin;
  iat: number;
  exp: number;
}
export interface UserAdmin {
  id: number;
  role: userRole;
}
