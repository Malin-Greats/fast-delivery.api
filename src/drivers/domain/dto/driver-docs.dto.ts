import { DriverDocuments } from "../driver-docs.model"

export interface DriverDocumentsIn{
    driver_id:string
    personalID:string
    drivers_license:string
    background_check:string
    profile_photo:string
}

export interface DriverDocumentsOut{
    personalID:string
    drivers_license:string
    background_check:string
    profile_photo:string
}

export function toDriverDocumentsOut({ personalID, drivers_license, background_check, profile_photo}:DriverDocuments):DriverDocumentsOut{
    const  documentsOut:DriverDocumentsOut ={
        personalID,
        drivers_license,
        background_check,
        profile_photo
    }
    return   documentsOut
}