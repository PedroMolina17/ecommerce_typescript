import { AxiosResponse } from "axios";
import {
  IUpdateUserById,
  ResponseDeleteUser,
  ResponseUpdateUser,
  Users,
} from "../types/user.type";
import { api } from "./axios.config";

const getAllUsers = async (
  page: number = 1,
  pageSize: number = 10,
): Promise<Users> => {
  const { data }: AxiosResponse<Users> = await api.get(
    `user/users?page=${page}&pageSize=${pageSize}`,
  );
  return data;
};
const getUserByName = async (
  page: number = 1,
  pageSize: number = 10,
  name: string,
): Promise<Users> => {
  const { data }: AxiosResponse<Users> = await api.get(
    `user/users/${name}?page=${page}&pageSize=${pageSize}`,
  );
  return data;
};
const updateUserById = async (
  id: number,
  userData: IUpdateUserById,
): Promise<ResponseUpdateUser> => {
  const { data }: AxiosResponse<ResponseUpdateUser> = await api.put(
    `user/${id}`,
    userData,
  );
  return data;
};
const deleteUserById = async (id: number): Promise<ResponseDeleteUser> => {
  const { data }: AxiosResponse<ResponseDeleteUser> = await api.delete(
    `user/${id}`,
  );
  return data;
};

const updateAdmin = async ({ userId, userData }: any) => {
  return new Promise((resolve) => {
    const updatedUser = { id: userId, ...userData };
    resolve(updatedUser);
  });
};

export {
  getAllUsers,
  getUserByName,
  updateUserById,
  deleteUserById,
  updateAdmin,
};
