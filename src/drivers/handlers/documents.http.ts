import {Request, Response} from "express"
import AppError, { isError } from "../../shared/errors/error";
import { IDriverDocumentsService } from "../ports/driver-docs-service.port";
import { DriverDocumentsIn, DriverDocumentsOut } from "../domain/dto/driver-docs.dto";
import { ApiResponse } from "../../shared/dto/response";
import {UploadDocuments } from "../../shared/multer/image-uploads";
import { documentsFields, documentsInFunc, documentsInUpdateFunc, documentsOutFunc } from "./documents-helper";

export class DriverDocumentsHandler {

    constructor (private _documentsService:IDriverDocumentsService){}

    async addDriverDocuments(req:Request, res:Response){
        UploadDocuments.fields([...documentsFields]) ( req,res, async (err)=>{
            const apiResponse = new ApiResponse()
            if(err){
                apiResponse.errors = err
                res.json(apiResponse)
            }else{
                if(req.files){
                    try {
                        const driver_id = req.params.driverId
                        const documentsIn =  await documentsInFunc(req, driver_id)
                        const data= await  this._documentsService.addDocuments(documentsIn )
                        apiResponse.data =await documentsOutFunc(data)
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

        })
    }

    async findDriverDocuments(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let driverId=<string>req.params.driverId
        try {
            const data= await  this._documentsService.findDocumentsByDriverId(driverId)
            apiResponse.data =await documentsOutFunc(data)
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

    async deleteDocuments(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let id=<string>req.params.documentsId
        try {
            const data= await  this._documentsService.deleteDocuments({by:{id}})
            apiResponse.data =await documentsOutFunc(data)
            apiResponse.success=true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                 return res.status(apiResponse.errors.statusCode).json(apiResponse)
             }
             return res.status(500).json(error)
        }
         return res.status(204).json(apiResponse)
    }

    async updateDocuments(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let id=<string>req.params.documentsId
        const documentsIn = <DriverDocumentsIn> req.body
        try {
            const requestIn = await documentsInUpdateFunc(req)
            const data=  await this._documentsService.updateDocuments({by:{driver_id:id}},{ by:requestIn})
            apiResponse.data =await documentsOutFunc(data)
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

    async findAllDocuments(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        try {
            const data= await  this._documentsService.findAllDocuments()
            let docs:DriverDocumentsOut[] = []
            for (let doc of data){
                const docOut =await documentsOutFunc(doc)
                docs.push(docOut)
            }
            apiResponse.data = docs
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



