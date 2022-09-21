export interface IJWTPayload {
    userId: string;
    role:string
}
export interface IToken{
    token:string;
    expiresIn:number
}