import { UserOut } from "../user/get-user.dto"
import { IToken } from "./jwt.dto"

export interface LoginIn{
    email:string
    password:string
}

export interface LoginOut{
    user:UserOut,
    token:IToken
}