// interfaz para las marcas

import { IResponse } from "./response.type";

// la respuesta que brinda el backend
export interface IResponseBrand extends IResponse {
  data: IBrand[];
}

// lo que se envia a un componente
export interface IBrand {
  // estas son las propiedades de las marcas
  id: number;
  name: string;
}
