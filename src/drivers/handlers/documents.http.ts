import {Request, Response} from "express"
import AppError, { isError } from "../../shared/errors/error";
import { IDriverDocumentsService } from "../ports/driver-docs-service.port";
import { DriverDocumentsIn, DriverDocumentsOut } from "../domain/dto/driver-docs.dto";
export class DriverDocumentsHandler {

    constructor (private _documentsService:IDriverDocumentsService){}

    async addDriverDocuments(req:Request, res:Response){
        let driverId=<string>req.params.driverId
        const documentsIn = <DriverDocumentsIn> req.body
        documentsIn.driver_id=driverId
        documentsIn.personalID=req.body.personal_id

        let response!:DriverDocumentsOut
        try {
            response= await  this._documentsService.addDriverDocuments(documentsIn )
        } catch (error) {
            if (isError(error)){
                const err= new AppError(error.message,error.detail, 400)
                 return res.status(err.statusCode).json(err)
             }
             return res.status(500).json(error)
        }
         return res.status(200).json(response)
    }

   

    async findDriverDocuments(req:Request, res:Response){
        let driverId=<string>req.params.driverId
        let response!:DriverDocumentsOut
        try {
            response= await  this._documentsService.findAllDriverDocuments(driverId)
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