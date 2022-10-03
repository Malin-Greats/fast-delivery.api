import {Request, Response} from "express"
import AppError, { isError } from "../../shared/errors/error"
import { ApiResponse } from "../../shared/dto/response"
import { IUserProfileSvc } from "../../shared/ports/profile.port"
import { getPayload } from "../../shared/http/get-payload"
import { Payload } from "../../shared/jwt.util"
import { ChangePasswordIn } from "../../auth/domain/dto/auth/change-pwd.dto"
import { AdminIn, AdminOut } from "../domain/dto/admin.dto"

export class AdminProfileHandler{

    constructor(private _adminProfileSvc:IUserProfileSvc<AdminIn>){}

    async getProfile(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        const payload = <Payload>await getPayload(req, res)

        try {
            apiResponse.data= await this._adminProfileSvc.getProfile(payload.userId)
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
        const apiResponse= new ApiResponse()
        const payload = <Payload>await getPayload(req, res)
        const requestIn  = <AdminIn>req.body
        try {
            apiResponse.data= await  this._adminProfileSvc.editProfile(payload.userId, requestIn)
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

    async addProfilePhoto(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        const payload = <Payload>await getPayload(req, res)
        const requestIn = <{profile_photo:string}>req.body
        try {
            apiResponse.data=await this._adminProfileSvc.addProfilePhoto(payload.userId, requestIn)
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

    async changePassword(req:Request, res:Response){
        const apiResponse =new ApiResponse()
        const payload = <Payload>await getPayload(req, res)
        let requestIn=<ChangePasswordIn>req.body
        try {
            apiResponse.data=  await this._adminProfileSvc.changePassword(payload.userId,requestIn)
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

}