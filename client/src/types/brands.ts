
// interfaz para las marcas
// la respuesta que brinda el backend
export interface IResponseBrand {
    error:      boolean;
    statusCode: number;
    data:       IBrand[];
}

// lo que se envia a un componente
export interface IBrand {

    // estas son las propiedades de las marcas 
    id:   number;
    name: string;
}