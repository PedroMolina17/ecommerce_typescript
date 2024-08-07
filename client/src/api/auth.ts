import { AxiosResponse } from "axios";
import { api } from "./axios.config";
import { ILogin, IResponseAuth } from "../types/auth.type";

async function login(user: ILogin) {
  const result = await api.post("/auth/login-admin", user);
  return result;
}

async function loginUser(user: ILogin) {
  const result = await api.post("/auth/login", user);
  return result;
}

async function logout() {
  const result = await api.post("/auth/logout-admin");
  return result.data;
}

async function checkAuth(): Promise<IResponseAuth> {
  const result: AxiosResponse<IResponseAuth> = await api.get(
    "/auth/check-admin"
  );
  return result.data;
}

export { checkAuth, login, logout, loginUser };
