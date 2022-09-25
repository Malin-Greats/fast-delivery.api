import { IUserService } from "../ports/user-service.port"
import {Request, Response} from "express"
import AppError, { isError } from "../../shared/errors/error"
import { UserOut, UserIn } from "../domain/dto/user/user.dto"
import { ApiResponse } from "../../shared/dto/response"
export class UserHandler{
    constructor(private _userService:IUserService){}

    
    async getUserById(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        let userId=<string>req.params.userId
        try {
            apiResponse.data= await  this._userService.findUserById(userId)
            apiResponse.success=true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                 return res.status(apiResponse.errors.statusCode).json(apiResponse)
             }
             return res.status(500).json(error)
        }
         return res.status(200).json(apiResponse)
    }

    async getUserByEmail(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let email=<string>req.params.userId
        try {
            apiResponse.data= await  this._userService.findUserByEmail(email)
            apiResponse.success=true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                 return res.status(apiResponse.errors.statusCode).json(apiResponse)
             }
             return res.status(500).json(error)
        }
         return res.status(200).json(apiResponse)
    }

    async getUserByContact(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let contact=<string>req.params.userId
        try {
            apiResponse.data= await  this._userService.findUserByContact(contact)
            apiResponse.success=true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                 return res.status(apiResponse.errors.statusCode).json(apiResponse)
             }
             return res.status(500).json(error)
        }
         return res.status(200).json(apiResponse)
    }



    async getAllUsers(eq:Request, res:Response){
        const apiResponse = new ApiResponse()
        try {
            apiResponse.data=await this._userService.findAllUsers("")
            apiResponse.success=true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                 return res.status(apiResponse.errors.statusCode).json(apiResponse)
             }
             return res.status(500).json(error)
        }
         return res.status(201).json(apiResponse)
    }
    async updateUser(req:Request, res:Response){
        const apiResponse =new ApiResponse()
        let userId=<string>req.params.userId
        let userRequest=<UserIn>req.body
        try {
            apiResponse.data=  await this._userService.updateUser(userId,userRequest)
            apiResponse.success = true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                 return res.status(apiResponse.errors.statusCode).json(apiResponse)
             }
             return res.status(500).json(error)
        }
        return res.status(201).json(apiResponse)
    }

    async deleteUser(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let userId=<string>req.params.userId
        try {
            apiResponse.data=await this._userService.deleteUser(userId)
       } catch (error) {
          if (isError(error)){
            apiResponse.errors= new AppError(error.message,error.detail, 400)
               return res.status(apiResponse.errors.statusCode).json(apiResponse)
           }
           return res.status(500).json(error)
       }
         return res.status(204).json(apiResponse)
    }
   
}