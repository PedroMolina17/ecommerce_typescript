import { IResponse } from "./response.type";

// interfaz para el login
export interface ILogin {
  email: string;
  password: string;
}
export interface IResponseAuth extends IResponse {
  authenticate: boolean;
  user: IUser;
  iat: number;
  exp: number;
}

export interface IUser {
  id: number;
  role: string;
  image: string;
}

export interface IAuthError extends IResponse {
  message: string;
}
