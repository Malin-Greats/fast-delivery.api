import {Request, Response} from "express"
import AppError, { isError } from "../../shared/errors/error"
import { ApiResponse } from "../../shared/dto/response"
import { IUserProfileSvc } from "../../shared/ports/profile.port"
import { getPayload } from "../../shared/http/get-payload"
import { Payload } from "../../shared/jwt.util"
import { ChangePasswordIn } from "../../auth/domain/dto/auth/change-pwd.dto"
import { DriverProfile } from "../domain/dto/driver-profile.dto"
import { IVehicleService } from "../ports/vehicle-service.port"
import { IDriverDocumentsService } from "../ports/driver-docs-service.port"
import { DriverDocumentsIn } from "../domain/dto/driver-docs.dto"
import { VehicleIn } from "../domain/dto/vehicle.dto"
import { validationResult } from "express-validator"

export class DriverProfileHandler{

    constructor(private _driverProfileSvc:IUserProfileSvc<DriverProfile>, private _vehicleSvc:IVehicleService,private _documentsSvc:IDriverDocumentsService ){}

    async getProfile(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {userId} = <Payload>await getPayload(req, res)
        try {
            apiResponse.data= await this._driverProfileSvc.getProfile(userId)
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

        const {userId} = <Payload>await getPayload(req, res)
        const requestIn  = <DriverProfile>req.body
        try {
            apiResponse.data= await  this._driverProfileSvc.editProfile(userId, requestIn)
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
        const {userId} = <Payload>await getPayload(req, res)
        const requestIn = <{profile_photo:string}>req.body
        try {
            apiResponse.data=await this._driverProfileSvc.addProfilePhoto(userId, requestIn)
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
        const {userId} = <Payload>await getPayload(req, res)
        let requestIn=<ChangePasswordIn>req.body
        try {
            apiResponse.data=  await this._driverProfileSvc.changePassword(userId,requestIn)
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





    async myDocuments(req:Request, res:Response){
        const apiResponse =new ApiResponse()
        const {userId} = <Payload>await getPayload(req, res)
        try {
            apiResponse.data=  await this._documentsSvc.findDocumentsBy({by:{driver_id:userId}})
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

    async updateDocuments(req:Request, res:Response){
        const apiResponse =new ApiResponse()
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {userId} = <Payload>await getPayload(req, res)
        let requestIn=<DriverDocumentsIn>req.body

        try {
            apiResponse.data=  await this._documentsSvc.updateDocuments({by:{driver_id:userId}}, requestIn)
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

    async addDocuments(req:Request, res:Response){
        const apiResponse =new ApiResponse()
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {userId} = <Payload>await getPayload(req, res)
        let requestIn=<DriverDocumentsIn>req.body
        requestIn.driver_id = userId
        try {
            apiResponse.data=  await this._documentsSvc.addDocuments(requestIn)
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

    async deleteDocuments(req:Request, res:Response){
        const apiResponse =new ApiResponse()
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {userId} = <Payload>await getPayload(req, res)

        try {
            apiResponse.data=  await this._documentsSvc.deleteDocuments({by:{driver_id:userId}})
            apiResponse.success = true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                 return res.status(apiResponse.errors.statusCode).json(apiResponse)
             }
             return res.status(500).json(error)
        }
        return res.status(204).json(apiResponse)
    }

    async myVehicles(req:Request, res:Response){
        const apiResponse =new ApiResponse()
        const {userId} = <Payload>await getPayload(req, res)
        try {
            apiResponse.data=  await this._vehicleSvc.findDriverVehicles(userId)
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

    async findVehicleById(req:Request, res:Response){
        const apiResponse =new ApiResponse()
        const {userId} = <Payload>await getPayload(req, res)
        let vehicleId=<string>req.params.vehicleId
        try {
            apiResponse.data=  await this._vehicleSvc.findVehicleBy({by:{id:vehicleId, driver_id:userId}})
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

    async updateVehicles(req:Request, res:Response){
        const apiResponse =new ApiResponse()
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const payload = <Payload>await getPayload(req, res)
        let requestIn=<VehicleIn>req.body
        let vehicleId=<string>req.params.vehicleId
        try {
            apiResponse.data=  await this._vehicleSvc.updateVehicle(vehicleId,requestIn)
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

    async addVehicles(req:Request, res:Response){
        const apiResponse =new ApiResponse()
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {userId} = <Payload>await getPayload(req, res)
        let requestIn=<VehicleIn>req.body
        requestIn.driver_id = userId
        try {
            apiResponse.data=  await this._vehicleSvc.addVehicle(requestIn)
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

    async deleteVehicles(req:Request, res:Response){
        const apiResponse =new ApiResponse()
        const {userId} = <Payload>await getPayload(req, res)
        let vehicleId=<string>req.params.vehicleId
        try {
            apiResponse.data=  await this._vehicleSvc.deleteVehicle(vehicleId)
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