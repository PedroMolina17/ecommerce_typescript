import { AxiosResponse } from "axios";
import { ILogin, IResponseAuth } from "../types/auth.type";
import { api } from "./axios.config";

// funcion para realizar la peticion de usuarios
async function login(user: ILogin) {
  // hago una peticion post al login con los datos del usuario
  const result = await api.post("/auth/login", user);

  console.log(result);

  // envio los datos del usuario
  return result;
}

async function logout() {
  const result = await api.post("/auth/logout");
  return result.data;
}

async function checkAuth(): Promise<IResponseAuth> {
  const result: AxiosResponse<IResponseAuth> = await api.get("/auth/check");
  return result.data;
}
// exportar mas de una funcion, en este caso la login
export { login, logout, checkAuth };
