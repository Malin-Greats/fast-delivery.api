import {Request, Response} from "express"
import AppError, { isError } from "../../shared/errors/error";
import { IDriverDocumentsService } from "../ports/driver-docs-service.port";
import { DriverDocumentsIn, DriverDocumentsOut } from "../domain/dto/driver-docs.dto";
import { ApiResponse } from "../../shared/dto/response";
import {moveFile, removeFile, TEMP_DIR, UploadToTemp, UPLOAD_DOCS_PATH } from "../../shared/multer/image-uploads";
import { documentsFields, documentsInFunc, documentsInUpdateFunc, documentsOutFunc } from "./documents-helper";
import { getPayload } from "../../shared/http/get-payload";
import { Payload } from "../../shared/jwt.util";
import fs from "fs";
import logger from "../../shared/errors/logger";

export class DriverDocumentsHandler {

    constructor (private _documentsService:IDriverDocumentsService){}

    async addDocuments(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        UploadToTemp.fields([...documentsFields]) ( req,res, async (err)=>{
            if(err){
                apiResponse.errors = err
                res.json(apiResponse)
            }else{
                if(req.files){
                    let files:DriverDocumentsIn|null =null
                    try {
                        const {driver_id} = await this.getDriverId(req, res)
                        if(driver_id){
                            const documentsIn =   documentsInFunc(req, driver_id)
                            files=documentsIn
                            const data= await  this._documentsService.addDocuments(documentsIn )
                            this.moveFiles(documentsIn, TEMP_DIR, UPLOAD_DOCS_PATH+"/_"+driver_id)
                            apiResponse.data = documentsOutFunc(req, data, driver_id)
                            apiResponse.success=true
                        }
                    } catch (error) {
                        if (isError(error)){
                            apiResponse.errors= new AppError(error.message,error.detail, 400)
                            return res.status(apiResponse.errors.statusCode).json(apiResponse)
                        }
                        return res.status(500).json(error)
                    }finally{
                        if (apiResponse.success===false && files!==null){
                            this.removeFiles(files, TEMP_DIR)
                        }
                    }
                    return res.status(200).json(apiResponse)
                }
            }

        })
    }

    async findDocuments(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        try {
            const {driver_id} = await this.getDriverId(req, res)
            if(driver_id){
                const data= await  this._documentsService.findDocumentsByDriverId(driver_id)
                if(driver_id &&driver_id!==null){
                    apiResponse.data = documentsOutFunc(req, data,driver_id)
                }
                apiResponse.success=true
            }
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
        try {
            const {driver_id} = await this.getDriverId(req, res)
            const data= await  this._documentsService.deleteDocuments({by:{ driver_id}})
            if(driver_id &&driver_id!==null){
                apiResponse.data = documentsOutFunc(req, data,driver_id)
            }
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
            const {driver_id} = await this.getDriverId(req, res)
            const requestIn =  documentsInUpdateFunc(req)
            const data=  await this._documentsService.updateDocuments({by:{driver_id}},{ by:requestIn})
            if(driver_id &&driver_id!==null){
                apiResponse.data = documentsOutFunc(req, data,driver_id)
            }
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
            const {driver_id, role}= await this.getDriverId(req, res)
            let data!:DriverDocumentsOut[];
            if (role=="driver"){
                data= await  this._documentsService.findAllDocuments({by:{driver_id}})
            }else if (role=="admin"){
                let data:DriverDocumentsOut[]
                if (driver_id===null){
                    data= await  this._documentsService.findAllDocuments()
                }else{
                    data =await this._documentsService.findAllDocuments({by:{driver_id}})
                }
            }
            let docs:DriverDocumentsOut[] = []
            for (let doc of data){
                if(driver_id &&driver_id !==null){
                    const docOut = documentsOutFunc(req, doc,driver_id)
                    docs.push(docOut)
                }
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

    private async getDriverId(req:Request, res:Response):Promise<{driver_id:string|null, role:string|null}>{
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
                return{driver_id:null, role:null}
        }
        return {driver_id, role}
    }
    private removeFiles(docs:DriverDocumentsIn, path:string){
        const filenames =[
            docs.national_id,
            docs.drivers_license,
            docs.police_clearance,
            docs.defensive_drivers_license,
            docs.vehicle_technical_certificate,
            docs.vehicle_insurance_registration
        ]
               for (let file of filenames){
            const filePath  = path+"/"+file
            if(fs.existsSync(filePath)){
                removeFile(filePath)
            }
        }

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
        if(!fs.existsSync(to)){
            fs.mkdir(to,(err) => {
                if (err) {
                    return logger.error(err);
                }
                console.log('Directory created successfully!');
            })
        }
        for (let file of filenames){
            moveFile(from+"/"+file, to+"/"+file)
        }

    }
}



