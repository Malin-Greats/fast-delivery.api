import { validationResult } from "express-validator";
import { ApiResponse } from "../../shared/dto/response";
import { IRideTypeService } from "../ports/ride-type/ride-type-service.port";
import {Request, Response} from 'express'
import { RideTypeIn } from "../domain/dto/ride-type.model";
import AppError, { isError } from "../../shared/errors/error";
import { rideTypesImgUrl, UploadRideTypes } from "../../shared/multer/image-uploads";
export class RideTypeHandler{
    constructor(private _typeService:IRideTypeService){}


   
    async addRideType(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        let request=<RideTypeIn>req.body
        UploadRideTypes.single("vehicle_image")
        ( req,res, async (err)=>{
            if(err){
                apiResponse.errors = err
                return res.status(500).json(apiResponse)
            }else{
                const file = req.file?.filename
                let request=<RideTypeIn>req.body
               
                if(file){
                    try {
                        request.vehicle_image = file
                        const data =await this._typeService.addRideType(request)
                        data.vehicle_image = rideTypesImgUrl+data.vehicle_image
                        apiResponse.data = data
                        apiResponse.success =true

                    } catch (error) {
                        if (isError(error)){
                            apiResponse.errors= new AppError(error.message,error.detail, 400)
                            return res.status(apiResponse.errors.statusCode).json(apiResponse)
                        }
                        return res.status(500).json(error)
                    }
                    return res.status(201).json(apiResponse)
                }else{
                    res.status(500).json(new AppError("Upload vehicle_image. Please!"))
                }
            }
        })
    }

    async findRideTypeById(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let rideTypeID=<string>req.params.rideTypeId
        try {
            apiResponse.data= await  this._typeService.findRideTypeById(rideTypeID)
            apiResponse.success =true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                 return res.status(apiResponse.errors.statusCode).json(apiResponse)
             }
             return res.status(500).json(error)
        }
         return res.status(200).json(apiResponse)
    }

    async findAllDrivers(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        try {
            apiResponse.data=await this._typeService.findAllRideTypes()
            apiResponse.success = true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                 return res.status(apiResponse.errors.statusCode).json(apiResponse)
             }
             return res.status(500).json(error)
        }
         return res.status(200).json(apiResponse)
    }

    async updateRideType (req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let rideTypeID=<string>req.params.rideTypeId
        let request=<RideTypeIn>req.body
        try {
            apiResponse.data=await this._typeService.updateRideType(rideTypeID, request)
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

    async deleteRideTypeIn (req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let rideTypeID=<string>req.params.rideTypeId
        try {
            apiResponse.data=await this._typeService.deleteRideType(rideTypeID)
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