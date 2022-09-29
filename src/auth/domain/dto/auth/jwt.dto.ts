export interface IJWTPayload {
    userId: string;
    role:string
}
export interface IToken{
    access_token:string;
    expires_in:number
}