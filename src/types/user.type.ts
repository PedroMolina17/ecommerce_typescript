import { userRole } from "./auth.type";
import { IPaginate } from "./paginate.type";

export interface IUserByName {
    userName: string;
}
export interface IUpdateUserById{
    userName: string
    email?: string
    role?: userRole
}

export interface IUserByNamePaginate extends IUserByName, IPaginate {}