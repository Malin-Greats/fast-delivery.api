import { UserOut } from "../user/user.dto"
import { IToken } from "./jwt.dto"

export interface LoginIn{
    contact:string
    password:string
}

export interface LoginOut{
    user:UserOut,
    token:IToken
}