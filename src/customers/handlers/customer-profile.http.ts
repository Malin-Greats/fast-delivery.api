import {Request, Response} from "express"
import AppError, { isError } from "../../shared/errors/error"
import { ApiResponse } from "../../shared/dto/response"
import { IUserProfileSvc } from "../../shared/ports/profile.port"
import { CustomerProfile } from "../domain/dto/customer-profile"
import { getPayload } from "../../shared/http/get-payload"
import { Payload } from "../../shared/jwt.util"
import { ChangePasswordIn } from "../../auth/domain/dto/auth/change-pwd.dto"
import { validationResult } from "express-validator"
import { EnforceHttpUrl, profileUrl, UploadProfile, UPLOAD_PROFILE_PATH } from "../../shared/multer/image-uploads"
import fs from 'fs'
import logger from "../../shared/errors/logger"
export class CustomerProfileHandler{

    constructor(private _customerProfileSvc:IUserProfileSvc<CustomerProfile>){}

    async getProfile(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        const payload = <Payload>await getPayload(req, res)

        try {
            const data = await this._customerProfileSvc.getProfile(payload.userId)
            apiResponse.data = data
            apiResponse.data.profile_photo =  EnforceHttpUrl(req, data.profile_photo, profileUrl)
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
        UploadProfile.single("profile_photo")
        ( req,res, async (err)=>{
            if(err){
                apiResponse.errors = err
                return res.status(500).json(apiResponse)
            }else{
                const payload = <Payload>await getPayload(req, res)
                const file = req.file?.filename
                let requestIn:{profile_photo:string}
                if(file){
                    requestIn = {profile_photo: file}
                    try {
                        const {old_profile_photo, new_profile_photo}=await this._customerProfileSvc.addProfilePhoto(payload.userId, requestIn)
                        const filePath = `${UPLOAD_PROFILE_PATH}/${old_profile_photo}`
                        if (fs.existsSync(filePath)){
                            fs.unlink(filePath, function (err) {
                                if (err) {
                                    apiResponse.errors= new AppError("Old file does't exist.")
                                    return res.status(400).json(apiResponse)
                                };
                                // if no error, file has been deleted successfully
                                logger.info(`Old profile photo with id: ${old_profile_photo}  deleted!`);
                            })
                        }else{
                            apiResponse.errors= new AppError("Old file does't exist.")
                            return res.status(400).json(apiResponse)
                        }
                        apiResponse.data ={profile_photo:profileUrl+new_profile_photo}
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
            }
        })
        return
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