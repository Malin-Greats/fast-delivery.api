import {Request, Response} from "express"
import AppError, { isError } from "../../shared/errors/error"
import { ApiResponse } from "../../shared/dto/response"
import { IUserProfileSvc } from "../../shared/ports/profile.port"
import { CustomerProfile } from "../domain/dto/customer-profile"
import { getPayload } from "../../shared/http/get-payload"
import { Payload } from "../../shared/jwt.util"
import { ChangePasswordIn } from "../../auth/domain/dto/auth/change-pwd.dto"
import { validationResult } from "express-validator"

export class CustomerProfileHandler{

    constructor(private _customerProfileSvc:IUserProfileSvc<CustomerProfile>){}

    async getProfile(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        const payload = <Payload>await getPayload(req, res)

        try {
            apiResponse.data= await this._customerProfileSvc.getProfile(payload.userId)
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const payload = <Payload>await getPayload(req, res)
        const requestIn  = <CustomerProfile>req.body
        try {
            apiResponse.data= await  this._customerProfileSvc.editProfile(payload.userId, requestIn)
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const payload = <Payload>await getPayload(req, res)
        const requestIn = <{profile_photo:string}>req.body
        try {
            apiResponse.data=await this._customerProfileSvc.addProfilePhoto(payload.userId, requestIn)
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const payload = <Payload>await getPayload(req, res)
        let requestIn=<ChangePasswordIn>req.body
        try {
            apiResponse.data=  await this._customerProfileSvc.changePassword(payload.userId,requestIn)
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