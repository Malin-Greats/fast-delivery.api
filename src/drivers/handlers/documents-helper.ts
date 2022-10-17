import { driverDocumentsImgUrl, EnforceHttpUrl } from "../../shared/multer/image-uploads";
import { DriverDocumentsOut, DriverDocumentsIn } from "../domain/dto/driver-docs.dto";
import {Request} from "express"
export const documentsFields = [
    {name:  "national_id", },
    {name:  "drivers_license"},
    {name:  "defensive_drivers_license"},
    {name:  "police_clearance"},
    {name:  "vehicle_technical_certificate"},
    {name:  "vehicle_insurance_registration"},
]
export  function documentsOutFunc(req:Request,{national_id, drivers_license,defensive_drivers_license, police_clearance, vehicle_insurance_registration, vehicle_technical_certificate}:DriverDocumentsOut, driver_id?:string ):DriverDocumentsOut{
   const path =driverDocumentsImgUrl+"_"+driver_id+"/"
    const data:DriverDocumentsOut={
        national_id: EnforceHttpUrl(req, national_id, path),
        drivers_license: EnforceHttpUrl(req, drivers_license, path),
        defensive_drivers_license:EnforceHttpUrl(req, defensive_drivers_license, path),
        police_clearance: EnforceHttpUrl(req, police_clearance, path),
        vehicle_technical_certificate: EnforceHttpUrl(req, vehicle_technical_certificate, path),
        vehicle_insurance_registration: EnforceHttpUrl(req, vehicle_insurance_registration, path),
    }
    return data
}

export   function documentsInFunc(req:Request, driver_id:string):DriverDocumentsIn{
    const files= req.files  as  {[fieldname: string]: Express.Multer.File[]};
    /* req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
        e.g.
            req.files['avatar'][0] -> File
            req.files['gallery'] -> Array
    */
        const result = {
        national_id: files['national_id'][0].filename,
        drivers_license: files['drivers_license'][0].filename,
        defensive_drivers_license: files['defensive_drivers_license'][0].filename,
        police_clearance: files['police_clearance'][0].filename,
        vehicle_technical_certificate: files['vehicle_technical_certificate'][0].filename,
        vehicle_insurance_registration: files['vehicle_insurance_registration'][0].filename,
        driver_id: driver_id
    }
    return result
}
export type UpdateDocumentsIn={
    [key:string]: string
}
export   function documentsInUpdateFunc(req:Request):UpdateDocumentsIn{
    const files= req.files  as  {[fieldname: string]: Express.Multer.File[]};
    const keys=["national_id", "drivers_license", "defensive_drivers_license", "police_clearance", "vehicle_technical_certificate", "vehicle_insurance_registration"]
    let result:UpdateDocumentsIn={};
    for(let key of keys){
        if(files[key]){
            result[key]=files[key][0].filename
        }
    }
    return result 
}