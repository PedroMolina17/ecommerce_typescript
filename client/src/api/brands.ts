
// importo el api (solicitud al servidor)
import { api } from "./axios.config";

// importo una interfaz para las marcas
import { IResponseBrand } from "../types/brands.ts";
import { AxiosResponse } from "axios";

async function getBrands() {

    // hago una peticion post al login con los datos del usuario
    const result:AxiosResponse<IResponseBrand> = await api.get("/brand/brands");

    console.log(result.data);

    // envio los datos 
    return result.data;
}

// exportar mas de una funcion, en este caso la login
export { getBrands };