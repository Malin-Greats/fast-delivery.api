import { IUserService } from "../ports/user-service.port"
import {Request, Response} from "express"
import { UserOut } from "../dto/user/get-user.dto"
import { UserIn } from "../dto/user/create-user.dto"
import AppError, { isError } from "../../shared/errors/error"
export class UserHandler{
    constructor(private _userService:IUserService){}

    
    async getUserById(req:Request, res:Response){
        let userId=<string>req.params.userId
        let response!:UserOut
        try {
            response= await  this._userService.findUserById(userId)
        } catch (error) {
            if (isError(error)){
                const err= new AppError(error.message,error.detail, 400)
                 return res.status(err.statusCode).json(err)
             }
             return res.status(500).json(error)
        }
         return res.status(200).json(response)
    }

    async getUserByEmail(req:Request, res:Response){
        let email=<string>req.params.userId
        let response!:UserOut
        try {
            response= await  this._userService.findUserByEmail(email)
        } catch (error) {
            if (isError(error)){
                const err= new AppError(error.message,error.detail, 400)
                 return res.status(err.statusCode).json(err)
             }
             return res.status(500).json(error)
        }
         return res.status(200).json(response)
    }

    async getUserByContact(req:Request, res:Response){
        let contact=<string>req.params.userId
        let response!:UserOut
        try {
            response= await  this._userService.findUserByContact(contact)
        } catch (error) {
            if (isError(error)){
                const err= new AppError(error.message,error.detail, 400)
                 return res.status(err.statusCode).json(err)
             }
             return res.status(500).json(error)
        }
         return res.status(200).json(response)
    }



    async getAllUsers(eq:Request, res:Response){
        let users!:UserOut[]
        try {
            users=await this._userService.findAllUsers("")
        } catch (error) {
            if (isError(error)){
                const err= new AppError(error.message,error.detail, 400)
                 return res.status(err.statusCode).json(err)
             }
             return res.status(500).json(error)
        }
         return res.status(201).json(users)
    }
    async updateUser(req:Request, res:Response){
        let userId=<string>req.params.userId
        let userRequest=<UserIn>req.body
        let response!:UserOut
        try {
            response=  await this._userService.updateUser(userId,userRequest)
        } catch (error) {
            if (isError(error)){
                const err= new AppError(error.message,error.detail, 400)
                 return res.status(err.statusCode).json(err)
             }
             return res.status(500).json(error)
        }
        return res.status(201).json(response)
    }

    async deleteUser(req:Request, res:Response){
        let userId=<string>req.params.userId
        let result!:UserOut
        try {
            result=await this._userService.deleteUser(userId)
       } catch (error) {
          if (isError(error)){
              const err= new AppError(error.message,error.detail, 400)
               return res.status(err.statusCode).json(err)
           }
           return res.status(500).json(error)
       }
         return res.sendStatus(204)
    }
   
}