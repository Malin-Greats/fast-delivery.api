import {Request, Response} from "express"
import AppError, { isError } from "../../shared/errors/error";
import { IDriverDocumentsService } from "../ports/driver-docs-service.port";
import { DriverDocumentsIn } from "../domain/dto/driver-docs.dto";
import { ApiResponse } from "../../shared/dto/response";
export class DriverDocumentsHandler {

    constructor (private _documentsService:IDriverDocumentsService){}

    async addDriverDocuments(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let driverId=<string>req.params.driverId
        const documentsIn = <DriverDocumentsIn> req.body
        documentsIn.driver_id=driverId
        documentsIn.personalID=req.body.personal_id

        try {
            apiResponse.data= await  this._documentsService.addDriverDocuments(documentsIn )
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

   

    async findDriverDocuments(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let driverId=<string>req.params.driverId
        try {
            apiResponse.data= await  this._documentsService.findAllDriverDocuments(driverId)
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


}