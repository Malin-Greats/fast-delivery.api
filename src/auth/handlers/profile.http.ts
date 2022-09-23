import {Request, Response} from "express"
import AppError, { isError } from "../../shared/errors/error"
import { IProfile } from "../dto/profile/profile.dto"
import { IProfileService } from "../ports/profile-service.port"
export class ProfileHandler{

    constructor(private _profileService:IProfileService){}

    async getProfile(req:Request, res:Response){
        const token =req.get('Authorization')
        if(!token){
            return res.sendStatus(401)
        }
        let response!:IProfile
        try {
            response=await this._profileService.getProfile(token)
       } catch (error) {
          if (isError(error)){
              const err= new AppError(error.message,error.detail, 400)
               return res.status(err.statusCode).json(err)
           }
           return res.status(500).json(error)
       }
       return res.status(200).json(response)
    }

    async editProfile(req:Request, res:Response){
        const token =req.get('Authorization')
        if(!token){
            return res.sendStatus(401)
        }
        let response!:IProfile
        const request=<IProfile>req.body
        try {
            response=await this._profileService.editProfile(token, request)
       } catch (error) {
          if (isError(error)){
              const err= new AppError(error.message,error.detail, 400)
               return res.status(err.statusCode).json(err)
           }
           return res.status(500).json(error)
       }
       return res.status(200).json(response)
    }
}   