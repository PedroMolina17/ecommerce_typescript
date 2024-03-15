import { userRole } from "./auth.type";
import { IPaginate } from "./paginate.type";

export interface IUserByName {
    userName: string;
}
export interface IUpdateUserById{
    userName: string
    email?: string
    image?: string
    publicIdImage?: string
    address?:string
    phone?:string    
}

export interface IUserByNamePaginate extends IUserByName, IPaginate {}