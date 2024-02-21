enum Role {
    admin='admin',user='user'
}
export interface Iregister{
    userName: string
    email: string
    password: string
    role:Role
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