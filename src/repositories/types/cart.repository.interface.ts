export interface ICartRespository{
    getCartByUserId(userId:number):Promise<ICart[]>
    createCart(cart:Omit<ICart, "id" | "createAt" | "total">):Promise<ICart>
    deleteCart(cartId:number):Promise<any>
    updateCart(cart:any):Promise<any> 
    addCartItem(cartItem:Omit <ICartItem, "id">):Promise<ICartItem>  
    updateCartItem(cartItem:ICartItem):Promise<ICartItem>
    deleteCartItem(cartItemId:number):Promise<ICartItem>
}

export interface ICart{
    id: number
    userId: number
    total: number
    createAt: Date
}

export interface ICartItem{
    id: number
    cartId: number
    productId: number
    quantity: number
    unitPrice: number
    totalItemPrice:number
    createAt: Date
}