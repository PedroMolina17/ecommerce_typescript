export interface ICreateBrand{    
    name: string
}
export interface IUpdateBrand extends ICreateBrand{
    id: number
}
export interface IDeleteBrand extends ICreateBrand{
    id: number
}