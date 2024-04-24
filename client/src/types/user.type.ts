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
  image: string | null;
  publicIdImage: string | null;
  address: string | null;
  phone: string | null;
  createAt: Date;
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
  image?: File;
  address?: string;
  phone?: string;
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
