import { IVehicleService } from "../ports/vehicle-service.port";
import {Request, Response} from "express"
import { VehicleIn, VehicleOut } from "../domain/dto/vehicle.dto";
import AppError, { isError } from "../../shared/errors/error";
import { Driver } from "../domain/driver.model";
export class VehicleHandler {

    constructor (private _vehicleService:IVehicleService){}

    async addDriverVehicle(req:Request, res:Response){
        let driverId=<string>req.params.driverId
        const vehicleIn = <VehicleIn> req.body
        vehicleIn.driver_id=driverId
        let response!:VehicleOut
        try {
            response= await  this._vehicleService.addDriverVehicle(vehicleIn )
        } catch (error) {
            if (isError(error)){
                const err= new AppError(error.message,error.detail, 400)
                 return res.status(err.statusCode).json(err)
             }
             return res.status(500).json(error)
        }
         return res.status(200).json(response)
    }


    async findDriverVehicles(req:Request, res:Response){
        let driverId=<string>req.params.driverId
        let response!:VehicleOut[]

        try {
            response= await  this._vehicleService.findDriverVehicles(driverId)
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