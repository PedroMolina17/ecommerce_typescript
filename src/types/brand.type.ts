export interface ICreateBrand{    
    name: string
}
export interface IUpdateBrand extends ICreateBrand{
    id: number
}
export interface IDeleteBrand{
    id: number
}