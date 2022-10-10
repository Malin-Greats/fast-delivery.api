import {Request, Response} from "express"
import { validationResult } from "express-validator";
import { ERole  as role} from "../../auth/domain/role.model";
import { ApiResponse } from "../../shared/dto/response";
import AppError, { isError } from "../../shared/errors/error"
import { DriverIn } from "../domain/dto/driver.dto";
import { IDriverService } from "../ports/driver-service.port"

export class DriverHandler{

    constructor(private _driverService:IDriverService){}

    async signUp(req:Request, res:Response){
        const apiResponse= new ApiResponse()
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let request=<DriverIn>req.body
        request.role =role.DRIVER

        try {
            apiResponse.data =await this._driverService.registerDriver(request)
            apiResponse.success =true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                return res.status(apiResponse.errors.statusCode).json(apiResponse)
            }
            return res.status(500).json(error)
        }
        return res.status(201).json(apiResponse)
    }

    async findDriverById(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let driverId=<string>req.params.driverId
        try {
            apiResponse.data= await  this._driverService.findDriverById(driverId)
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
            apiResponse.data=await this._driverService.findAllDrivers("")
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

    async approveDriver (req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let driver_id=<string>req.params.driverId
        try {
            apiResponse.data=await this._driverService.approveDriver(driver_id)
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

    async rejectDriver (req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let driver_id=<string>req.params.driverId
        try {
            apiResponse.data=await this._driverService.rejectDriver(driver_id)
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

    async getApprovalStatus (req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let driverId=<string>req.params.driverId
        try {
            apiResponse.data=await this._driverService.approvalStatus(driverId)
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
}