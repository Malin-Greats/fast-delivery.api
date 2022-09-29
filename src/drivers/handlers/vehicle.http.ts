import { IVehicleService } from "../ports/vehicle-service.port";
import {Request, Response} from "express"
import { VehicleIn, } from "../domain/dto/vehicle.dto";
import AppError, { isError } from "../../shared/errors/error";
import { ApiResponse } from "../../shared/dto/response";
export class VehicleHandler {

    constructor (private _vehicleService:IVehicleService){}

    async addVehicle(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let driverId=<string>req.params.driverId
        const vehicleIn = <VehicleIn> req.body
        vehicleIn.driver_id=driverId
        try {
            apiResponse.data= await  this._vehicleService.addVehicle(vehicleIn )
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

    async findDriverVehicles(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let driverId=<string>req.params.driverId
        try {
            apiResponse.data= await  this._vehicleService.findDriverVehicles(driverId)
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

    async findAllVehicles(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        try {
            apiResponse.data= await  this._vehicleService.findAllVehicles()
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

    async updateVehicle(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let id=<string>req.params.vehicleId
        const vehicleIn = <VehicleIn> req.body
        try {
            apiResponse.data= await  this._vehicleService.updateVehicle(id,vehicleIn )
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

    async deleteVehicle(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let id=<string>req.params.vehicleId
        try {
            apiResponse.data= await  this._vehicleService.deleteVehicle(id )
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

    async findVehicleById(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let id=<string>req.params.vehicleId
        try {
            apiResponse.data= await  this._vehicleService.findVehicleById(id)
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
}