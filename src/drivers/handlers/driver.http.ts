import {Request, Response} from "express"
import { validationResult } from "express-validator";
import { ERole  as role} from "../../auth/domain/role.model";
import AppError, { isError } from "../../shared/errors/error"
import { DriverIn, DriverOut } from "../domain/dto/driver.dto";
import { IDriverService } from "../ports/driver-service.port"

export class DriverHandler{

    constructor(private _driverService:IDriverService){}

    async signUp(req:Request, res:Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let request=<DriverIn>req.body
        request.role =role.DRIVER

        let result!:DriverOut;
        try {
            result =await this._driverService.registerDriver(request)
        } catch (error) {
            if (isError(error)){
               const err= new AppError(error.message,error.detail, 400)
                return res.status(err.statusCode).json(err)
            }
            return res.status(500).json(error)
        }
        return res.status(201).json(result)
    }

    async findDriverById(req:Request, res:Response){
        let driverId=<string>req.params.driverId
        let response!:DriverOut
        try {
            response= await  this._driverService.findDriverById(driverId)
        } catch (error) {
            if (isError(error)){
                const err= new AppError(error.message,error.detail, 400)
                 return res.status(err.statusCode).json(err)
             }
             return res.status(500).json(error)
        }
         return res.status(200).json(response)
    }

    async findAllDrivers(req:Request, res:Response){
        let drivers!:DriverOut[]
        try {
            drivers=await this._driverService.findAllDrivers("")
        } catch (error) {
            if (isError(error)){
                const err= new AppError(error.message,error.detail, 400)
                 return res.status(err.statusCode).json(err)
             }
             return res.status(500).json(error)
        }
         return res.status(201).json(drivers)
    }
}