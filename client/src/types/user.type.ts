export interface Users {
  error: boolean;
  statusCode: number;
  info: Info;
  results: Result[];
}

export interface Info {
  count: number;
  pages: number;
  totalItems: number;
  next: string | null;
  prev: null | string;
}

export interface Result {
  id: number;
  userName: string;
  email: string;
  password: string;
  address: null | string;
  phone: null | string;
  googleId: null | string;
  role: Role;
}

export enum Role {
  User = "user",
}

export interface IUserByNamePaginate {
  userName: string;
  page: number;
  pageSize: number;
}
export interface IUpdateUserById {
  userName: string;
  email?: string;
  role?: string;
}
export interface ResponseUpdateUser {
  error: boolean;
  statusCode: number;
  message: string;
}
export interface ResponseDeleteUser {
  error: boolean;
  statusCode: number;
  message: string;
}
