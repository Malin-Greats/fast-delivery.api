
import { IToken } from "./jwt.dto"

export interface LoginIn{
    phone_number:string
    password:string
}

export interface LoginOut<T>{
    user:T
    token:IToken
}