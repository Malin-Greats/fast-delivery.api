import {Request, Response} from "express"
import { ApiResponse } from "../../shared/dto/response"
import AppError, { isError } from "../../shared/errors/error"
import { ChangePasswordIn } from "../domain/dto/auth/change-pwd.dto"
import { IProfilePhoto, IUserProfile } from "../domain/dto/profile/profile.dto"
import { IProfileService } from "../ports/profile-service.port"
export class ProfileHandler{

    constructor(private _profileService:IProfileService){}

    async getProfile(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        const token =req.get('Authorization')
        if(!token){
            return res.sendStatus(401)
        }
       
        try {
            apiResponse.data=await this._profileService.getProfile(token)
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

   

    async editProfile(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        const token =req.get('Authorization')
        if(!token){
            return res.sendStatus(401)
        }
        const request=<IUserProfile>req.body
        try {
            apiResponse.data=await this._profileService.editProfile(token, request)
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

    async changePassword(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        const token =req.get('Authorization')
        if(!token){
            return res.sendStatus(401)
        }
        
        const request=<ChangePasswordIn>req.body
        try {
            apiResponse.data =await this._profileService.changePassword(token, request)
            apiResponse.message="Password chaged successfully."
       } catch (error) {
          if (isError(error)){
            apiResponse.errors= new AppError(error.message,error.detail, error.statusCode)
               return res.status(apiResponse.errors.statusCode).json(apiResponse)
           }
           return res.status(500).json(error)
       }
       return res.status(200).json({success:true, message:"Password changed successfully!"})
    }

   async addProfilePhoto(req:Request, res:Response){
    const apiResponse = new ApiResponse()
    const token =req.get('Authorization')
    if(!token){
        return res.sendStatus(401)
    }
    
    const request:IProfilePhoto=<IProfilePhoto>req.body
    try {
        apiResponse.data=await this._profileService.addProfilePhoto(token, request)
        apiResponse.success=true
        apiResponse.message="Changed profile photo successfully."
   } catch (error) {
      if (isError(error)){
        apiResponse.errors= new AppError(error.message,error.detail, error.statusCode)
           return res.status(apiResponse.errors.statusCode).json(apiResponse)
       }
       return res.status(500).json(error)
   }
   return res.status(200).json(apiResponse)
}
}   