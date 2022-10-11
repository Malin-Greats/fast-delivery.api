import {Request, Response} from "express"
import AppError, { isError } from "../../shared/errors/error";
import { IDriverDocumentsService } from "../ports/driver-docs-service.port";
import { DriverDocumentsIn, DriverDocumentsOut } from "../domain/dto/driver-docs.dto";
import { ApiResponse } from "../../shared/dto/response";
import {moveFile, TEMP_DIR, UploadDocuments, UploadToTemp, UPLOAD_DOCS_PATH } from "../../shared/multer/image-uploads";
import { documentsFields, documentsInFunc, documentsInUpdateFunc, documentsOutFunc } from "./documents-helper";
import { getPayload } from "../../shared/http/get-payload";
import { Payload } from "../../shared/jwt.util";

export class DriverDocumentsHandler {

    constructor (private _documentsService:IDriverDocumentsService){}

    async addDocuments(req:Request, res:Response){
        UploadToTemp.fields([...documentsFields]) ( req,res, async (err)=>{
            const apiResponse = new ApiResponse()
            if(err){
                apiResponse.errors = err
                res.json(apiResponse)
            }else{
                if(req.files){
                    try {
                        const driverId = <string>await this.getDriverId(req, res)
                        const documentsIn =  await documentsInFunc(req, driverId)
                        this.moveFiles(documentsIn, TEMP_DIR, UPLOAD_DOCS_PATH)
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

    async findDocuments(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        try {
            const driverId = <string>await this.getDriverId(req, res)
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
            const driver_id = this.getDriverId(req, res)
            const data= await  this._documentsService.deleteDocuments({by:{id, driver_id}})
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
        const documentsIn = <DriverDocumentsIn> req.body
        try {
            const driverId = <string>await this.getDriverId(req, res)
            const requestIn = await documentsInUpdateFunc(req)
            const data=  await this._documentsService.updateDocuments({by:{driver_id:driverId}},{ by:requestIn})
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
            const driver_id = this.getDriverId(req, res)
            if (driver_id===null){

            }
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

    private async getDriverId(req:Request, res:Response){
        const {userId, role} = <Payload>await getPayload(req, res)
        let driver_id!: string;
        switch(role){
            case 'admin':
                driver_id = req.params.driverId
                break;
            case 'driver':
                driver_id = userId
                break;
            default:
                return null
        }
        return driver_id
    }

    private moveFiles(docs:DriverDocumentsIn, from:string, to:string){
        const filenames =[
            docs.national_id,
            docs.drivers_license,
            docs.police_clearance,
            docs.defensive_drivers_license,
            docs.vehicle_technical_certificate,
            docs.vehicle_insurance_registration
        ]
        for (let file of filenames){
            moveFile(from+"/"+file, to+"/"+file)
        }

    }
}



