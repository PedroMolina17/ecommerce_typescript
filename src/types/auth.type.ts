export enum userRole {
    admin='admin',user='user'
}
export interface Iregister{
    userName: string
    email: string
    password: string
    role:userRole
}
export interface ILogin{
    email:string
    password:string
}
export interface AuthResult {
    accessToken: string;
    refreshToken: string;
    message: string;
  }
 export interface DecodedToken {
    user: {
      id: number;
      role: string;
    };
    iat: number; 
    exp: number; 
  }
  